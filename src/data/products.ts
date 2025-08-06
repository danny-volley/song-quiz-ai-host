import { Product, ResponseLengthInfo } from '../types'

export const products: Product[] = [
  {
    id: 'songquiz',
    name: 'SongQuiz',
    description: 'Music trivia and song identification game',
    flowSteps: [
      {
        id: 'round_result',
        name: 'Round Result',
        description: 'Player answered correctly or incorrectly',
        type: 'round_result',
        hasSettings: true
      },
      {
        id: 'streak_milestone',
        name: 'Streak Milestone',
        description: 'Player hit 3+, 5+, or 10+ correct answers in a row',
        type: 'streak_milestone',
        hasSettings: true
      },
      {
        id: 'game_result',
        name: 'Game Result',
        description: 'End-of-game performance summary',
        type: 'game_result',
        hasSettings: true
      },
      {
        id: 'comeback_moment',
        name: 'Comeback Moment',
        description: 'Player recovering from wrong answers or breaking slumps',
        type: 'comeback_moment',
        hasSettings: false
      },
      {
        id: 'answer_steal',
        name: 'Answer Steal',
        description: 'One player guesses partial answer, another player completes it to steal points',
        type: 'answer_steal',
        hasSettings: true
      }
    ]
  },
  {
    id: 'wheel',
    name: 'Wheel of Fortune',
    description: 'Word puzzle solving game with spinning wheel',
    flowSteps: [
      {
        id: 'puzzle_solve',
        name: 'Puzzle Solve',
        description: 'Player successfully solved a puzzle',
        type: 'puzzle_solve',
        hasSettings: true
      },
      {
        id: 'bankrupt',
        name: 'Bankrupt',
        description: 'Player hit bankrupt and lost their money',
        type: 'bankrupt',
        hasSettings: false
      },
      {
        id: 'big_money_spin',
        name: 'Big Money Spin',
        description: 'Player landed on high-value wheel section',
        type: 'big_money_spin',
        hasSettings: true
      },
      {
        id: 'final_puzzle',
        name: 'Final Puzzle',
        description: 'Performance in the bonus round',
        type: 'final_puzzle',
        hasSettings: true
      }
    ]
  },
  {
    id: 'jeopardy',
    name: 'Jeopardy',
    description: 'Trivia game show with categories and point values',
    flowSteps: [
      {
        id: 'daily_double',
        name: 'Daily Double',
        description: 'Player found a Daily Double and made a wager',
        type: 'daily_double',
        hasSettings: true
      },
      {
        id: 'category_completion',
        name: 'Category Completion',
        description: 'Player completed an entire category',
        type: 'category_completion',
        hasSettings: false
      },
      {
        id: 'final_jeopardy',
        name: 'Final Jeopardy',
        description: 'Performance in Final Jeopardy round',
        type: 'final_jeopardy',
        hasSettings: true
      },
      {
        id: 'score_momentum',
        name: 'Score Momentum',
        description: 'Significant lead changes or comebacks',
        type: 'score_momentum',
        hasSettings: false
      }
    ]
  }
]

export const responseLengths: ResponseLengthInfo[] = [
  {
    id: 'short',
    label: 'Short',
    description: 'Quick reactions and immediate responses',
    wordCount: '1-3 words'
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Balanced personality with moderate detail',
    wordCount: '3-8 words'
  },
  {
    id: 'long',
    label: 'Long',
    description: 'Full personality expression with context',
    wordCount: '12-20 words'
  }
]