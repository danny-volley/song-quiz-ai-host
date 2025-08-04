import type { ProductType, FlowStepSettings } from '../types'

export interface ContextExample {
  id: string
  text: string
  category: 'player_action' | 'game_description' | 'situation'
}

const songQuizExamples: { [key: string]: (settings?: FlowStepSettings) => ContextExample[] } = {
  round_result: (settings) => {
    const isCorrect = settings?.isCorrect
    const baseExamples = [
      // Player actions/answers
      { id: '1', text: 'Shake It Off by Taylor Swift', category: 'player_action' as const },
      { id: '2', text: 'Bohemian Rhapsody - Queen', category: 'player_action' as const },
      { id: '3', text: 'Player guessed "Hotel California by Eagles"', category: 'player_action' as const },
      { id: '4', text: 'Charlie answered "Rolling in the Deep by Adele"', category: 'player_action' as const },
      
      // Game descriptions
      { id: '5', text: 'Player was way off their guess', category: 'game_description' as const },
      { id: '6', text: 'That was a tricky 90s hip-hop track that stumped everyone', category: 'game_description' as const },
      { id: '7', text: 'Charlie nailed the artist but missed the song title', category: 'game_description' as const },
      { id: '8', text: 'Perfect guess with only 3 seconds of the intro played', category: 'game_description' as const },
      
      // Situations
      { id: '9', text: 'Player is on a 3-song winning streak', category: 'situation' as const },
      { id: '10', text: 'Close call - got it right just before time ran out', category: 'situation' as const }
    ]

    if (isCorrect === true) {
      return baseExamples.filter((_, i) => [0, 1, 2, 3, 7, 8, 9].includes(i))
    } else if (isCorrect === false) {
      return baseExamples.filter((_, i) => [4, 5, 6].includes(i)).concat([
        { id: '11', text: 'Player guessed "Wonderwall" but it was "Champagne Supernova"', category: 'player_action' },
        { id: '12', text: 'Missed that classic Beatles track from the 60s', category: 'game_description' },
        { id: '13', text: 'So close! Right artist, wrong song', category: 'situation' }
      ])
    }
    
    return baseExamples
  },

  streak_milestone: (settings) => {
    const streakCount = settings?.streakCount || 3
    return [
      { id: '1', text: `Player just hit ${streakCount} correct answers in a row!`, category: 'situation' as const },
      { id: '2', text: `Amazing ${streakCount}-song streak across different decades`, category: 'game_description' as const },
      { id: '3', text: `Charlie nailed ${streakCount} straight rock classics`, category: 'situation' as const },
      { id: '4', text: `Perfect streak of ${streakCount} - mix of pop, rock, and hip-hop`, category: 'game_description' as const },
      { id: '5', text: `${streakCount} in a row! Player is absolutely on fire right now`, category: 'situation' as const },
      { id: '6', text: `Incredible ${streakCount}-song run through the 80s playlist`, category: 'game_description' as const },
      { id: '7', text: `Player dominated with ${streakCount} correct - from Beethoven to Beyoncé`, category: 'game_description' as const },
      { id: '8', text: `That's ${streakCount} straight! Player knows their music`, category: 'situation' as const },
      { id: '9', text: `Unstoppable ${streakCount}-song streak across multiple genres`, category: 'game_description' as const },
      { id: '10', text: `${streakCount} consecutive wins! Player is in the zone`, category: 'situation' as const }
    ]
  },

  game_result: (settings) => {
    const performance = settings?.performance || 3
    if (performance >= 4) {
      return [
        { id: '1', text: 'Perfect game! Player got all 5 songs correct', category: 'game_description' as const },
        { id: '2', text: 'Incredible performance - 100% accuracy across all genres', category: 'game_description' as const },
        { id: '3', text: 'Charlie dominated the final round with perfect scores', category: 'situation' as const },
        { id: '4', text: 'Outstanding game - got 4 out of 5 songs right', category: 'game_description' as const },
        { id: '5', text: 'Player nailed the final song for the win!', category: 'situation' as const },
        { id: '6', text: 'Flawless victory - perfect 5/5 score', category: 'game_description' as const },
        { id: '7', text: 'Amazing finish - came back to win in the final song', category: 'situation' as const },
        { id: '8', text: 'High score achieved! Player knew every song', category: 'game_description' as const },
        { id: '9', text: 'Exceptional game - only missed one tricky track', category: 'game_description' as const },
        { id: '10', text: 'Player crushed it with a perfect 5 out of 5', category: 'situation' as const }
      ]
    } else if (performance <= 2) {
      return [
        { id: '1', text: 'Tough game - player only got 1 out of 5 songs correct', category: 'game_description' as const },
        { id: '2', text: 'Challenging playlist stumped the player today', category: 'situation' as const },
        { id: '3', text: 'Player struggled with the song selection', category: 'game_description' as const },
        { id: '4', text: 'Not their best round - lots of tricky tracks', category: 'situation' as const },
        { id: '5', text: 'Rough start but player kept trying until the end', category: 'situation' as const },
        { id: '6', text: 'Only got 2 out of 5 songs - tough playlist today', category: 'game_description' as const },
        { id: '7', text: 'Player gave it their all despite the tough song selection', category: 'situation' as const },
        { id: '8', text: 'Missed 4 out of 5 but showed great sportsmanship', category: 'game_description' as const },
        { id: '9', text: 'Hard-fought game against some really obscure tracks', category: 'situation' as const },
        { id: '10', text: 'Player learned a lot of new songs today', category: 'situation' as const }
      ]
    }
    
    return [
      { id: '1', text: 'Solid game - player got 3 out of 5 songs right', category: 'game_description' as const },
      { id: '2', text: 'Good mix of hits and misses across different genres', category: 'game_description' as const },
      { id: '3', text: 'Player showed steady improvement throughout the game', category: 'situation' as const },
      { id: '4', text: 'Decent performance with some really good guesses', category: 'game_description' as const },
      { id: '5', text: 'Charlie held their own against a challenging playlist', category: 'situation' as const },
      { id: '6', text: 'Balanced game - strong on pop, weaker on country', category: 'game_description' as const },
      { id: '7', text: 'Player finished with 3 out of 5 correct', category: 'situation' as const },
      { id: '8', text: 'Respectable showing with 60% accuracy overall', category: 'game_description' as const },
      { id: '9', text: 'Consistent performance from start to finish', category: 'situation' as const },
      { id: '10', text: 'Player demonstrated good musical knowledge', category: 'game_description' as const }
    ]
  },

  comeback_moment: () => [
    { id: '1', text: 'Player was down 0-2 but just scored 3 in a row!', category: 'situation' as const },
    { id: '2', text: 'Amazing comeback after missing the first 3 songs', category: 'situation' as const },
    { id: '3', text: 'Charlie bounced back strong after that rough patch', category: 'situation' as const },
    { id: '4', text: 'From zero correct to suddenly on fire - what a turnaround!', category: 'situation' as const },
    { id: '5', text: 'Player found their groove after struggling early on', category: 'situation' as const },
    { id: '6', text: 'Incredible rally - went from last place to first', category: 'situation' as const },
    { id: '7', text: 'That was the spark they needed to get back in the game', category: 'situation' as const },
    { id: '8', text: 'Perfect timing for a comeback - just when it mattered most', category: 'situation' as const },
    { id: '9', text: 'Player refused to give up and it paid off big time', category: 'situation' as const },
    { id: '10', text: 'What a recovery! From 1 correct to nailing the final 3', category: 'situation' as const }
  ],

  // Default for any other flow steps
  default: () => [
    { id: '1', text: 'Player is doing great so far', category: 'situation' as const },
    { id: '2', text: 'Exciting moment in the game', category: 'situation' as const },
    { id: '3', text: 'Charlie made a smart play', category: 'player_action' as const },
    { id: '4', text: 'The game is heating up', category: 'situation' as const },
    { id: '5', text: 'Player showed good musical instincts', category: 'game_description' as const },
    { id: '6', text: 'Great energy from the player', category: 'situation' as const },
    { id: '7', text: 'This round is getting interesting', category: 'situation' as const },
    { id: '8', text: 'Player is focused and ready', category: 'situation' as const },
    { id: '9', text: 'Nice musical knowledge on display', category: 'game_description' as const },
    { id: '10', text: 'The competition is getting fierce', category: 'situation' as const }
  ]
}

const wheelExamples: { [key: string]: (settings?: FlowStepSettings) => ContextExample[] } = {
  puzzle_solve: (settings) => {
    const difficulty = settings?.difficulty || 'medium'
    const difficultyExamples = {
      easy: [
        { id: '1', text: 'Player solved "GOOD MORNING" with most letters revealed', category: 'player_action' as const },
        { id: '2', text: 'Charlie got "HAPPY BIRTHDAY" pretty quickly', category: 'player_action' as const },
        { id: '3', text: 'Easy puzzle solved: "BEST FRIENDS"', category: 'game_description' as const }
      ],
      medium: [
        { id: '1', text: 'Player solved "PRACTICE MAKES PERFECT" with skill', category: 'player_action' as const },
        { id: '2', text: 'Charlie figured out "DIAMOND IN THE ROUGH"', category: 'player_action' as const },
        { id: '3', text: 'Solid solve on "BETTER LATE THAN NEVER"', category: 'game_description' as const }
      ],
      hard: [
        { id: '1', text: 'Incredible solve: "ENCYCLOPEDIA BRITANNICA" with minimal letters', category: 'player_action' as const },
        { id: '2', text: 'Player cracked "SUPERCALIFRAGILISTICEXPIALIDOCIOUS"', category: 'player_action' as const },
        { id: '3', text: 'Amazing! Solved the tough puzzle with only R-S-T-L-N-E', category: 'game_description' as const }
      ]
    }
    
    return [
      ...difficultyExamples[difficulty as keyof typeof difficultyExamples],
      { id: '4', text: 'Player studied the board carefully before solving', category: 'situation' as const },
      { id: '5', text: 'Great puzzle-solving instincts on display', category: 'game_description' as const },
      { id: '6', text: 'Charlie took their time and got it right', category: 'situation' as const },
      { id: '7', text: 'Methodical approach paid off with the solve', category: 'game_description' as const },
      { id: '8', text: 'Player had that "aha!" moment and solved it', category: 'situation' as const },
      { id: '9', text: 'Excellent word recognition skills shown', category: 'game_description' as const },
      { id: '10', text: 'Smart solve after careful consideration', category: 'situation' as const }
    ]
  },

  big_money_spin: (settings) => {
    const spinValue = settings?.spinValue || 1000
    return [
      { id: '1', text: `Player spun $${spinValue} and called the letter T!`, category: 'player_action' as const },
      { id: '2', text: `Huge spin! $${spinValue} on the wheel`, category: 'situation' as const },
      { id: '3', text: `Charlie hit the $${spinValue} wedge with style`, category: 'player_action' as const },
      { id: '4', text: `Big money! $${spinValue} and there are 3 R's in the puzzle`, category: 'game_description' as const },
      { id: '5', text: `Player's lucky spin landed on $${spinValue}`, category: 'situation' as const },
      { id: '6', text: `What a spin! $${spinValue} per letter`, category: 'situation' as const },
      { id: '7', text: `Charlie called N and there are 2 - that's $${spinValue * 2}!`, category: 'game_description' as const },
      { id: '8', text: `Perfect timing for a $${spinValue} spin`, category: 'situation' as const },
      { id: '9', text: `Player hit the high-value $${spinValue} wedge`, category: 'player_action' as const },
      { id: '10', text: `Lucky break with the $${spinValue} spin`, category: 'situation' as const }
    ]
  },

  final_puzzle: (settings) => {
    const difficulty = settings?.difficulty || 'medium'
    if (difficulty === 'hard') {
      return [
        { id: '1', text: 'Player solved "WORLD CHAMPIONSHIP" in the bonus round!', category: 'player_action' as const },
        { id: '2', text: 'Incredible! Charlie got the tough final puzzle', category: 'situation' as const },
        { id: '3', text: 'Amazing solve with just R-S-T-L-N-E and D-M-C-O', category: 'game_description' as const },
        { id: '4', text: 'Player won the car with that brilliant final solve!', category: 'situation' as const },
        { id: '5', text: 'Challenging puzzle but the player figured it out', category: 'game_description' as const },
        { id: '6', text: 'Charlie studied the letters and nailed it', category: 'player_action' as const },
        { id: '7', text: 'Difficult final puzzle solved in the nick of time', category: 'situation' as const },
        { id: '8', text: 'Player showed great mental agility on that tough one', category: 'game_description' as const },
        { id: '9', text: 'Bonus round victory with a tricky phrase', category: 'situation' as const },
        { id: '10', text: 'Player earned that big win with skill and luck', category: 'game_description' as const }
      ]
    }
    
    return [
      { id: '1', text: 'Player solved "CHOCOLATE CAKE" and won big!', category: 'player_action' as const },
      { id: '2', text: 'Charlie figured out the final puzzle for $25,000', category: 'situation' as const },
      { id: '3', text: 'Bonus round success! Player got "FAMILY VACATION"', category: 'game_description' as const },
      { id: '4', text: 'Final puzzle solved: "GOOD LUCK CHARM"', category: 'player_action' as const },
      { id: '5', text: 'Player won the bonus round with time to spare', category: 'situation' as const },
      { id: '6', text: 'Charlie made quick work of that final puzzle', category: 'game_description' as const },
      { id: '7', text: 'Bonus round victory! Player solved it smoothly', category: 'situation' as const },
      { id: '8', text: 'Great final puzzle solve for the grand prize', category: 'game_description' as const },
      { id: '9', text: 'Player showed composure in the bonus round', category: 'situation' as const },
      { id: '10', text: 'Excellent bonus round performance by the player', category: 'game_description' as const }
    ]
  },

  // Bankrupt doesn't have settings
  bankrupt: () => [
    { id: '1', text: 'Player hit BANKRUPT and lost $2,400', category: 'situation' as const },
    { id: '2', text: 'Ouch! Charlie spun BANKRUPT at the worst time', category: 'situation' as const },
    { id: '3', text: 'Heartbreaking BANKRUPT after building up $3,000', category: 'game_description' as const },
    { id: '4', text: 'Player lost everything to the BANKRUPT wedge', category: 'situation' as const },
    { id: '5', text: 'BANKRUPT! There goes $1,800 in winnings', category: 'game_description' as const },
    { id: '6', text: 'Unlucky spin landed on BANKRUPT', category: 'situation' as const },
    { id: '7', text: 'Charlie hit BANKRUPT but kept a positive attitude', category: 'situation' as const },
    { id: '8', text: 'Tough break - BANKRUPT wiped out the round', category: 'game_description' as const },
    { id: '9', text: 'Player spun too hard and hit BANKRUPT', category: 'player_action' as const },
    { id: '10', text: 'BANKRUPT struck at the most painful moment', category: 'situation' as const }
  ],

  default: () => [
    { id: '1', text: 'Player made a smart letter choice', category: 'player_action' as const },
    { id: '2', text: 'Charlie is studying the puzzle board', category: 'situation' as const },
    { id: '3', text: 'Good strategy shown by the player', category: 'game_description' as const },
    { id: '4', text: 'Player called a vowel at the right time', category: 'player_action' as const },
    { id: '5', text: 'Charlie is building up their winnings', category: 'situation' as const },
    { id: '6', text: 'Steady progress on this puzzle', category: 'game_description' as const },
    { id: '7', text: 'Player is showing good puzzle instincts', category: 'game_description' as const },
    { id: '8', text: 'Charlie made a calculated risk', category: 'player_action' as const },
    { id: '9', text: 'The puzzle is starting to come together', category: 'situation' as const },
    { id: '10', text: 'Player is thinking strategically', category: 'game_description' as const }
  ]
}

const jeopardyExamples: { [key: string]: (settings?: FlowStepSettings) => ContextExample[] } = {
  daily_double: (settings) => {
    const wagerAmount = settings?.wagerAmount || 1000
    return [
      { id: '1', text: `Player found Daily Double and wagered $${wagerAmount}!`, category: 'player_action' as const },
      { id: '2', text: `Charlie bet $${wagerAmount} on the Daily Double - all or nothing!`, category: 'player_action' as const },
      { id: '3', text: `Daily Double! Player is risking $${wagerAmount} on this answer`, category: 'situation' as const },
      { id: '4', text: `Big wager of $${wagerAmount} on the Daily Double clue`, category: 'game_description' as const },
      { id: '5', text: `Player went all-in with $${wagerAmount} on Daily Double`, category: 'player_action' as const },
      { id: '6', text: `Confident wager! $${wagerAmount} riding on this Daily Double`, category: 'situation' as const },
      { id: '7', text: `Charlie made a bold $${wagerAmount} Daily Double wager`, category: 'player_action' as const },
      { id: '8', text: `High stakes: $${wagerAmount} Daily Double bet`, category: 'game_description' as const },
      { id: '9', text: `Player doubled down with $${wagerAmount} on Daily Double`, category: 'player_action' as const },
      { id: '10', text: `Strategic $${wagerAmount} wager on the Daily Double`, category: 'game_description' as const }
    ]
  },

  final_jeopardy: (settings) => {
    const difficulty = settings?.difficulty || 'medium'
    const difficultyContext = {
      easy: 'straightforward Final Jeopardy',
      medium: 'challenging Final Jeopardy', 
      hard: 'incredibly difficult Final Jeopardy'
    }
    
    return [
      { id: '1', text: `Player wagered everything on this ${difficultyContext[difficulty as keyof typeof difficultyContext]}`, category: 'player_action' as const },
      { id: '2', text: `Charlie wrote down their answer with confidence`, category: 'player_action' as const },
      { id: '3', text: `Final Jeopardy category is "WORLD CAPITALS" - player looks ready`, category: 'situation' as const },
      { id: '4', text: `Player is trailing by $2,000 going into Final Jeopardy`, category: 'game_description' as const },
      { id: '5', text: `This Final Jeopardy will determine the champion`, category: 'situation' as const },
      { id: '6', text: `Charlie has the lead but Final Jeopardy could change everything`, category: 'game_description' as const },
      { id: '7', text: `Player made a strategic wager for Final Jeopardy`, category: 'player_action' as const },
      { id: '8', text: `Nail-biting Final Jeopardy - anyone could win`, category: 'situation' as const },
      { id: '9', text: `Player got the Final Jeopardy correct and won!`, category: 'game_description' as const },
      { id: '10', text: `Dramatic finish with Final Jeopardy deciding it all`, category: 'situation' as const }
    ]
  },

  category_completion: () => [
    { id: '1', text: 'Player swept the entire "POTPOURRI" category!', category: 'game_description' as const },
    { id: '2', text: 'Charlie ran the table on "WORLD CAPITALS"', category: 'player_action' as const },
    { id: '3', text: 'Complete category sweep - all five clues correct', category: 'game_description' as const },
    { id: '4', text: 'Player dominated "BEFORE & AFTER" from top to bottom', category: 'game_description' as const },
    { id: '5', text: 'Impressive run through the "SCIENCE" category', category: 'situation' as const },
    { id: '6', text: 'Charlie knows their "MOVIE QUOTES" - perfect category!', category: 'player_action' as const },
    { id: '7', text: 'Clean sweep of "AMERICAN HISTORY" by the player', category: 'game_description' as const },
    { id: '8', text: 'Player cleared out "WORD ORIGINS" completely', category: 'player_action' as const },
    { id: '9', text: 'Perfect performance on the "LITERATURE" category', category: 'game_description' as const },
    { id: '10', text: 'Charlie showed expertise by running "SPORTS" category', category: 'situation' as const }
  ],

  score_momentum: () => [
    { id: '1', text: 'Player made an incredible comeback from last place!', category: 'situation' as const },
    { id: '2', text: 'Charlie went from $5,000 behind to taking the lead', category: 'game_description' as const },
    { id: '3', text: 'Dramatic momentum shift - player is now ahead by $3,000', category: 'situation' as const },
    { id: '4', text: 'Player rallied with five correct responses in a row', category: 'game_description' as const },
    { id: '5', text: 'Charlie turned the game around in Double Jeopardy', category: 'situation' as const },
    { id: '6', text: 'Amazing surge put the player in first place', category: 'game_description' as const },
    { id: '7', text: 'Player went on a $8,000 scoring run', category: 'situation' as const },
    { id: '8', text: 'Charlie erased a huge deficit with smart play', category: 'game_description' as const },
    { id: '9', text: 'Momentum completely shifted after that Daily Double', category: 'situation' as const },
    { id: '10', text: 'Player turned potential elimination into victory', category: 'game_description' as const }
  ],

  default: () => [
    { id: '1', text: 'Player selected "POTPOURRI" for $400', category: 'player_action' as const },
    { id: '2', text: 'Charlie answered confidently and got it right', category: 'situation' as const },
    { id: '3', text: 'Good strategy shown in category selection', category: 'game_description' as const },
    { id: '4', text: 'Player is building momentum this round', category: 'situation' as const },
    { id: '5', text: 'Charlie made a smart play on that clue', category: 'game_description' as const },
    { id: '6', text: 'Player demonstrated good knowledge across categories', category: 'game_description' as const },
    { id: '7', text: 'Solid performance so far by the player', category: 'situation' as const },
    { id: '8', text: 'Charlie is showing good Jeopardy instincts', category: 'game_description' as const },
    { id: '9', text: 'Player made a calculated category choice', category: 'player_action' as const },
    { id: '10', text: 'The competition is heating up this round', category: 'situation' as const }
  ]
}

export function generateExamples(
  product: ProductType, 
  flowStep: string, 
  settings?: FlowStepSettings
): ContextExample[] {
  const productExamples = {
    songquiz: songQuizExamples,
    wheel: wheelExamples,
    jeopardy: jeopardyExamples
  }

  const examples = productExamples[product]
  const generator = examples[flowStep] || examples.default
  
  return generator(settings)
}

export function getRandomExample(
  product: ProductType, 
  flowStep: string, 
  settings?: FlowStepSettings
): ContextExample {
  const examples = generateExamples(product, flowStep, settings)
  const randomIndex = Math.floor(Math.random() * examples.length)
  return examples[randomIndex]
}