<p align="center">
  <img src="app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"/>
</p>

# ShieldHer


  **An Intelligent android app that uses ML model to recognise the tone and emotional state of the statement and automatically trigger actions like sending location to nearby police station thorough sms, she teams etc and also live tracking using geo tracking** 
  
  



### 💡 Intro


Women are now on respected positions in the country, but if we take a look behind the curtains, we see even then they are being exploited. Each day we read about horrific crimes being committed against women in our country like it’s a norm. Thats why we came up with this app.

#### AI/ML model that recognises the tone and perform counter action:
If it hears keywords like ‘bachao’ or ‘help’, it uses a machine learning model to judge the tone and emotional state of the statement and automatically trigger actions like sending location to nearby police station thorough sms, she teams etc and also live tracking using geo tracking.Our model is cabale of differentiatng between  a cry for real help and a casual conversation like “could you help me with this recipe?”. Native language keywords can also be included.



#### Dataset
- We are using [RAVDESS](https://www.kaggle.com/uwrfkaggler/ravdess-emotional-speech-audio), [SAVEE](https://www.kaggle.com/barelydedicated/savee-database), [TESS](https://www.kaggle.com/ejlok1/toronto-emotional-speech-set-tess) dataset of speech. We filtered some of the data according to our use case which consists of 2000 speech files of 10 different emotions including like female fear, female sad, female happy, male fear and so on. 
#### Feature Extraction
- MFCC Features:
MFCCs are the Mel Frequency Cepstral Coefficients. MFCC takes into account human perception for sensitivity at appropriate frequencies by converting the conventional frequency to Mel Scale, and are thus suitable for speech recognition tasks quite well
- MELL Spectrogram:
A Fast Fourier Transform is computed on overlapping windowed segments of the signal, and we get what is called the spectrogram. This is just a spectrogram that depicts amplitude which is mapped on a Mel scale.
- Chroma:
A Chroma vector is typically a 12-element feature vector indicating how much energy of each pitch class is present in the signal in a standard chromatic scale.

#### Models
 - Multilayer perceptron classifier:
It is capable for understanding complex relation ships between features and labels, it is based on Artificial neural network. It uses no linear activation functions for deriving hidden layer values.
It uses Adam optimizer by default for optimization task, also it uses nonconvex loss functions which gives a drawback of stocking in local optima. The model reaches on accuracy of 67 percent accuracy on validation dataset which is 25 percent of total samples.

- Support vector machine classifier:
SVm classifiers is also used for ensemble and making a robust output. We used kernel linear in our project. 

#### Library Section 
 - Fast Api - uvicorn[standard] - Librosa - sklearn - soundfile - tqdm - numpy

### 📸 Screenshots

||||
|:----------------------------------------:|:-----------------------------------------:|:-----------------------------------------: |
| ![Imgur](![WhatsApp Image 2025-04-08 at 09 31 50_f284b2d5](https://github.com/user-attachments/assets/85bfd00d-e916-4748-9d3e-c4d17241b15e)
)
) | ![Imgur](![WhatsApp Image 2025-04-08 at 09 31 59_fea0dcae](https://github.com/user-attachments/assets/839f26d5-3db5-4216-bee7-010d7c883c04)
) | ![Imgur](![WhatsApp Image 2025-04-08 at 09 33 06_d54165cf](https://github.com/user-attachments/assets/0ce5b337-f122-4597-9749-101b09e06adc)
) |
| ![Imgur]![WhatsApp Image 2025-04-08 at 09 29 17_05ab22d6](https://github.com/user-attachments/assets/aa1df07b-3b01-4ff9-92ff-52c4fd114afe)
() | ![Imgur](![WhatsApp Image 2025-04-08 at 09 29 18_2ab5675b](https://github.com/user-attachments/assets/eaa6af5e-bc8a-437d-8db0-f18336f3bd5b)
) |  |
| ![Imgur](![WhatsApp Image 2025-04-08 at 09 29 18_f99af672](https://github.com/user-attachments/assets/6c71aff7-bc8d-494b-a33d-d4b6b5a04425)
) | ![Imgur](![WhatsApp Image 2025-04-08 at 09 29 19_adcd666d](https://github.com/user-attachments/assets/daeeb02c-b6d6-4aea-b28b-b8a1433d002c)
) |  |


### 📌 Features
- [x] AI/ML model that recognises the tone and perform counter action.
- [x] Live location tracking
- [x] SOS 
- [x] Store Recordings For Future Analysis and Investigation.


### ⚡ Getting Started
* Clone or download repository as a zip file.
* Open project in Android Studio.
* Create Firebase project.
* Paste google-services.json file in app/ folder
* In Firebase console enable all Firebase services listed in section Features.
* Finally run the app `SHIFT+F10`.

