# 🎮 Memory Card Game

A fun and interactive memory card matching game built with React. Test your memory by finding matching pairs of emoji cards!

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎯 **Multiple Grid Sizes**: Play on 4x4, 6x6, or 8x8 grids
- 🏆 **Leaderboard System**: Track top 5 scores for each grid size
- ⏱️ **Timer & Move Counter**: Monitor your performance in real-time
- 💾 **Persistent Storage**: Scores are saved locally using localStorage
- 🎨 **Smooth Animations**: Card flip animations for better UX
- 🔒 **Name Requirement**: Players must enter their name before starting
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🍎 **Emoji Cards**: 24 colorful fruit and vegetable emojis

## 🎯 How to Play

1. **Enter Your Name**: You must provide your name before you can start playing
2. **Click Cards**: Click on any card to reveal the emoji
3. **Find Matches**: Click another card to find its matching pair
4. **Remember**: If cards don't match, they flip back - remember their positions!
5. **Win**: Match all pairs to complete the game
6. **Compete**: Try to beat your best time and moves on the leaderboard

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Fantom-spec/MemoryCardGame.git
cd MemoryCardGame
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Built With

- **React** - Frontend framework
- **React Hooks** - State management (useState, useEffect)
- **LocalStorage API** - Data persistence
- **CSS3** - Styling and animations

## 📦 Project Structure

```
MemoryCardGame/
├── src/
│   ├── App.jsx          # Main game component
│   ├── App.css          # Game styles
│   └── index.js         # Entry point
├── public/
│   └── index.html
├── package.json
└── README.md
```

## 🎮 Game Mechanics

### Scoring System
- **Time**: Lower is better - complete the game as fast as possible
- **Moves**: Fewer moves result in better scores
- Leaderboard sorts by time first, then by moves

### Grid Sizes
- **4x4**: 8 pairs (16 cards) - Beginner friendly
- **6x6**: 18 pairs (36 cards) - Medium difficulty
- **8x8**: 32 pairs (64 cards) - Expert level

## 🎨 Customization

You can customize the game by modifying these aspects:

### Adding More Emojis
Edit the `allEmojis` array in `App.jsx`:
```javascript
const allEmojis = [
  "🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍑",
  // Add your emojis here
];
```

### Changing Card Flip Duration
Modify the timeout in the matching logic:
```javascript
setTimeout(() => {
  // Current: 600ms
}, 600);
```

### Styling
All styles are in `App.css` - customize colors, animations, and layout to your preference.

## 💾 Data Persistence

The game uses browser localStorage to save:
- Leaderboard data for all grid sizes
- Top 5 scores per grid size
- Player names, times, and move counts

**Storage Key**: `memory_leaderboard`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add difficulty levels (Easy/Medium/Hard)
- Implement sound effects
- Add multiplayer mode
- Create different themes
- Add daily challenges
- Implement achievements system

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Fantom-spec**
- GitHub: [@Fantom-spec](https://github.com/Fantom-spec)

## 🙏 Acknowledgments

- Emoji icons provided by Unicode Consortium
- Inspired by classic memory card games
- Built with React documentation and best practices

## 📸 Screenshots

<!-- Add screenshots of your game here -->

## 🐛 Known Issues

- None at the moment! Please report any bugs in the [Issues](https://github.com/Fantom-spec/MemoryCardGame/issues) section.

## 🔮 Future Enhancements

- [ ] Add sound effects for card flips and matches
- [ ] Implement different card themes (animals, flags, numbers)
- [ ] Add multiplayer functionality
- [ ] Create mobile app version
- [ ] Add difficulty settings (time limits, fewer previews)
- [ ] Implement global online leaderboard
- [ ] Add dark/light theme toggle

---

⭐ **Star this repo if you enjoyed the game!** ⭐

Made with ❤️ by Fantom-spec