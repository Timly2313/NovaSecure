import cv2
from ultralytics import YOLO
from flask import Flask, Response
import time

app = Flask(__name__)

# UPGRADE 1: Changed from yolov8n (Nano) to yolov8s (Small) for much better accuracy
model = YOLO("yolov8s.pt")  

# Open webcam (0 = default camera)
cap = cv2.VideoCapture(0)

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break

        # UPGRADE 2: Added conf=0.6 so it only shows objects it is at least 60% sure about. 
        # (Notice we did NOT add classes=[0], so it still detects everything)
        results = model(frame, conf=0.6)[0]

        # Draw bounding boxes
        annotated_frame = results.plot()  # built-in drawing

        # Encode as JPEG
        ret, buffer = cv2.imencode('.jpg', annotated_frame)
        frame_bytes = buffer.tobytes()

        # Yield as multipart MJPEG
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        # Small delay to control frame rate (adjust as needed)
        time.sleep(0.033)  # ~30 FPS

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/snapshot')
def snapshot():
    """Returns a single processed frame for mobile polling."""
    success, frame = cap.read()
    if not success:
        return "Failed to grab frame", 500

    # UPGRADE 2: Added the same 60% confidence filter here
    results = model(frame, conf=0.6)[0]

    # Draw bounding boxes
    annotated_frame = results.plot()

    # Encode as JPEG
    ret, buffer = cv2.imencode('.jpg', annotated_frame)
    frame_bytes = buffer.tobytes()

    # Return a standard single image response
    return Response(frame_bytes, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False, threaded=True)