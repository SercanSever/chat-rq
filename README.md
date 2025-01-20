# Chat-RQ: Real-Time Chat Application

## 📱 Screenshots

### Authentication
<p float="left">
  <img src=".github/screenshots/login_bok6yd.png" width="200" alt="Login Screen" />
  <img src=".github/screenshots/signup_lpjch3.png" width="200" alt="Signup Screen" />
</p>

### Chat Interface
<p float="left">
  <img src=".github/screenshots/chatlist_cwnjph.png" width="200" alt="Chat List" />
  <img src=".github/screenshots/full-chat_gucwmu.png" width="200" alt="Full Chat View" />
  <img src=".github/screenshots/full-chat-2_awkm4s.png" width="200" alt="Full Chat View 2" />
</p>

### Features
<p float="left">
  <img src=".github/screenshots/emoji_uaudon.png" width="200" alt="Emoji Picker" />
  <img src=".github/screenshots/send-image_u19rxo.png" width="200" alt="Send Image" />
  <img src=".github/screenshots/sended-image_yhr1rm.png" width="200" alt="Sent Image" />
</p>

### Voice Recording
<p float="left">
  <img src=".github/screenshots/voice-recorder_mbzo31.png" width="200" alt="Voice Recorder" />
  <img src=".github/screenshots/voice-recorder-chat_ic0625.png" width="200" alt="Voice Recording in Chat" />
</p>

## 📝 Project Description

Chat-RQ is a real-time chat application developed using modern web technologies. Built on Firebase infrastructure, the application enables users to exchange instant messages, share photos, share your captured photo, voice record, and use emojis.

## 🚀 Features

- 👤 User authentication system
- 💬 Real-time messaging
- 🎙️ Voice record
- 📹 Webcam image capture
- 📸 Photo, voice, captured image sharing, downloading and viewing
- 😊 Emoji support
- 📥 Image download

## 🛠️ Technologies

- **Frontend Framework:** React.js
- **Build Tool:** Vite
- **Backend/Database:** Firebase
- **State Management:** Zustand
- **UI Components:**
  - emoji-picker-react
  - react-webcam
  - react-toastify
  - timeago.js

## 📦 Installation

1.Clone the project:

```bash
git clone [repo-url]
```

2.Install dependencies:

```bash
npm install
```

3.Create `.env` file and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY = "api-key"
VITE_CLOUDINARY_UPLOAD_URL = "api-url"
VITE_CLOUDINARY_UPLOAD_PRESET = "cloudinary-preset-name"
VITE_CLOUDINARY_FOLDER = "folder-name"
VITE_CLOUDINARY_CHATFILES_FOLDER = "folder-name"

```

4.Start the development server:

```bash
npm run dev
```

## 🏗️ Project Structure

```plaintext
chat-rq/
├── src/
│   ├── components/         # UI components
│   │   ├── chat/          # Chat interface
│   │   ├── detail/        # Detail view
│   │   ├── list/          # Chat list
│   │   ├── login/         # Login screen
│   │   └── notification/  # Notification system
│   ├── lib/               # Firebase configuration
│   ├── stores/            # Zustand state management
│   └── assets/            # Static files
├── public/                # Public files
└── dist/                  # Build output
```

## 📜 Commands

- `npm run dev`: Start development server
- `npm run build`: Build project for production
- `npm run lint`: Run ESLint code checks
- `npm run preview`: Preview build output

## 🔒 Security

- Secure user management with Firebase Authentication
- Online/offline status tracking
- Secure file sharing and storage

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
