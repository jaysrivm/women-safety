# women-safety
Our AI-driven Women’s Safety module is designed to proactively protect users in threatening or unsafe situations using intelligent behavior detection and smart emergency response systems.
2. Project Layout

distress_detector/
├── main.py
├── detectors/
│   ├── voice.py
│   ├── text.py
│   └── motion.py
├── alerting.py
├── models/
│   ├── voice_model.pkl
│   ├── text_model.pt
│   └── motion_model.pkl
└── requirements.txt

4. Running

1. pip install -r requirements.txt


2. Populate models/ with your trained classifiers.


3. Create a .env with your Twilio + SMTP creds.


4. uvicorn main:app --reload


requirements.txt

fastapi
uvicorn
scikit-learn
torch
transformers
librosa
numpy
pydantic
twilio
python-dotenv
