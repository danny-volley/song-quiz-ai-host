import type { ProductType, FlowStepSettings } from '../types'

export interface ContextExample {
  id: string
  text: string
  category: 'player_action' | 'game_description' | 'situation'
}

export interface DetailedContextExample {
  id: string
  title: string
  description: string
  text: string
}

const songQuizExamples: { [key: string]: (settings?: FlowStepSettings) => ContextExample[] } = {
  round_result: (settings) => {
    const isCorrect = settings?.isCorrect
    
    const correctExamples = [
      // Player actions/answers - Correct
      { id: '1', text: 'Charlie said "Shake It Off by Taylor Swift" right away', category: 'player_action' as const },
      { id: '2', text: 'Player answered "Bohemian Rhapsody by Queen" as soon as it started', category: 'player_action' as const },
      { id: '3', text: 'Charlie shouted "Hotel California by Eagles!"', category: 'player_action' as const },
      { id: '4', text: 'Player responded with "Rolling in the Deep by Adele"', category: 'player_action' as const },
      { id: '5', text: 'Charlie called out "Billie Jean by Michael Jackson"', category: 'player_action' as const },
      { id: '6', text: 'Player got excited: "Don\'t Stop Believin\' by Journey!"', category: 'player_action' as const },
      { id: '7', text: 'Charlie said "Sweet Child O\' Mine by Guns N\' Roses"', category: 'player_action' as const },
      { id: '8', text: 'Player yelled "Thunderstruck by AC/DC!" with enthusiasm', category: 'player_action' as const },
      { id: '9', text: 'Charlie answered "I Will Always Love You by Whitney Houston"', category: 'player_action' as const },
      { id: '10', text: 'Player said "Stairway to Heaven by Led Zeppelin" clearly', category: 'player_action' as const },
      { id: '11', text: 'Charlie responded "Purple Rain by Prince" after two seconds', category: 'player_action' as const },
      { id: '12', text: 'Player called out "Smells Like Teen Spirit by Nirvana"', category: 'player_action' as const },
      { id: '13', text: 'Charlie hummed along then said "Dancing Queen by ABBA"', category: 'player_action' as const },
      { id: '14', text: 'Player quietly said "Imagine by John Lennon"', category: 'player_action' as const },
      { id: '15', text: 'Charlie answered "Like a Rolling Stone by Bob Dylan"', category: 'player_action' as const },
      
      // Game descriptions - Correct
      { id: '16', text: 'Player got it right within 3 seconds of the song starting', category: 'game_description' as const },
      { id: '17', text: 'Charlie figured it out from just the opening chord', category: 'game_description' as const },
      { id: '18', text: 'Player recognized this 1980s rock classic', category: 'game_description' as const },
      { id: '19', text: 'Charlie knew this lesser-known B-side track', category: 'game_description' as const },
      { id: '20', text: 'Player got both the artist and song title right', category: 'game_description' as const },
      { id: '21', text: 'Charlie picked up on the lead singer\'s voice', category: 'game_description' as const },
      { id: '22', text: 'Player got this 1990s hip-hop track spot-on', category: 'game_description' as const },
      { id: '23', text: 'Charlie recognized this acoustic version', category: 'game_description' as const },
      { id: '24', text: 'Player could tell this was the live recording', category: 'game_description' as const },
      { id: '25', text: 'Charlie knew this country music hit', category: 'game_description' as const },
      { id: '26', text: 'Player got this Motown classic right', category: 'game_description' as const },
      { id: '27', text: 'Charlie spotted this remix version', category: 'game_description' as const },
      { id: '28', text: 'Player knew this Beatles deep cut from 1967', category: 'game_description' as const },
      { id: '29', text: 'Charlie remembered this one-hit wonder from the 90s', category: 'game_description' as const },
      { id: '30', text: 'Player figured out this instrumental track', category: 'game_description' as const },
      
      // Situations - Correct
      { id: '31', text: 'Charlie started to say one thing, then switched to the right answer', category: 'situation' as const },
      { id: '32', text: 'Player got the answer out just as time was running out', category: 'situation' as const },
      { id: '33', text: 'Charlie responded as soon as the song started', category: 'situation' as const },
      { id: '34', text: 'Player waited 5 seconds, then gave the correct answer', category: 'situation' as const },
      { id: '35', text: 'Charlie came back with the answer in under 2 seconds', category: 'situation' as const },
      { id: '36', text: 'Player said "umm..." then gave the right answer', category: 'situation' as const },
      { id: '37', text: 'Charlie got it with 8 seconds left on the clock', category: 'situation' as const },
      { id: '38', text: 'Player squeezed the answer in before the 15-second limit', category: 'situation' as const },
      { id: '39', text: 'Charlie jumped right in with the answer', category: 'situation' as const },
      { id: '40', text: 'Player spoke clearly and got it right', category: 'situation' as const },
      { id: '41', text: 'Charlie came through at the very last second', category: 'situation' as const },
      { id: '42', text: 'Player was quick on the draw and got it right', category: 'situation' as const },
      { id: '43', text: 'Charlie pulled through under pressure', category: 'situation' as const },
      { id: '44', text: 'Player kept their cool and got the correct answer', category: 'situation' as const },
      { id: '45', text: 'Charlie said "I think it\'s..." and was spot-on', category: 'situation' as const }
    ]

    const incorrectExamples = [
      // Player actions/answers - Incorrect
      { id: '1', text: 'Charlie said "Wonderwall by Oasis" but it was "Champagne Supernova"', category: 'player_action' as const },
      { id: '2', text: 'Player answered "Stairway to Heaven by Led Zeppelin" when it was "Kashmir"', category: 'player_action' as const },
      { id: '3', text: 'Charlie called out "That\'s Michael Jackson!" but it was Prince', category: 'player_action' as const },
      { id: '4', text: 'Player guessed "Sweet Caroline by Neil Diamond" but it was "Love is an Open Door"', category: 'player_action' as const },
      { id: '5', text: 'Charlie yelled "Bohemian Rhapsody!" but it was "We Are the Champions"', category: 'player_action' as const },
      { id: '6', text: 'Player said "The Beatles" when it was The Rolling Stones', category: 'player_action' as const },
      { id: '7', text: 'Charlie responded "Hotel California by Eagles" but it was "Take It Easy"', category: 'player_action' as const },
      { id: '8', text: 'Player said "Thriller by Michael Jackson" but it was "Beat It"', category: 'player_action' as const },
      { id: '9', text: 'Charlie went with "Nirvana" when it was Pearl Jam', category: 'player_action' as const },
      { id: '10', text: 'Player guessed "Piano Man by Billy Joel" but it was "Uptown Girl"', category: 'player_action' as const },
      { id: '11', text: 'Charlie exclaimed "That\'s Journey!" but it was Foreigner', category: 'player_action' as const },
      { id: '12', text: 'Player answered "Dancing Queen by ABBA" when it was "Mamma Mia"', category: 'player_action' as const },
      { id: '13', text: 'Charlie guessed "Purple Rain by Prince" but it was "1999"', category: 'player_action' as const },
      { id: '14', text: 'Player said "Imagine by John Lennon" but it was "Let It Be"', category: 'player_action' as const },
      { id: '15', text: 'Charlie answered "Fleetwood Mac" when it was The Eagles', category: 'player_action' as const },
      
      // Game descriptions - Incorrect
      { id: '16', text: 'Player missed this 1990s hip-hop classic completely', category: 'game_description' as const },
      { id: '17', text: 'Charlie got the artist right but wrong song from the same album', category: 'game_description' as const },
      { id: '18', text: 'Player missed this Beatles track from "Abbey Road"', category: 'game_description' as const },
      { id: '19', text: 'Charlie confused this with a different Queen song', category: 'game_description' as const },
      { id: '20', text: 'Player guessed wrong on this lesser-known B-side track', category: 'game_description' as const },
      { id: '21', text: 'Charlie mixed up two songs with similar guitar intros', category: 'game_description' as const },
      { id: '22', text: 'Player confused the original with the more famous cover version', category: 'game_description' as const },
      { id: '23', text: 'Charlie missed this acoustic version of a rock classic', category: 'game_description' as const },
      { id: '24', text: 'Player got the decade right but wrong artist', category: 'game_description' as const },
      { id: '25', text: 'Charlie confused this live version with the studio recording', category: 'game_description' as const },
      { id: '26', text: 'Player missed this Motown classic from the 1960s', category: 'game_description' as const },
      { id: '27', text: 'Charlie got fooled by this lesser-known remix version', category: 'game_description' as const },
      { id: '28', text: 'Player mixed up two different songs by the same artist', category: 'game_description' as const },
      { id: '29', text: 'Charlie missed this deep cut from a popular album', category: 'game_description' as const },
      { id: '30', text: 'Player confused the title track with another song from the album', category: 'game_description' as const },
      
      // Situations - Incorrect
      { id: '31', text: 'Charlie started to say the right answer, then switched to the wrong one', category: 'situation' as const },
      { id: '32', text: 'Player hesitated for 10 seconds, then guessed incorrectly', category: 'situation' as const },
      { id: '33', text: 'Charlie ran out of time while still deciding', category: 'situation' as const },
      { id: '34', text: 'Player said "Um, is it..." then gave the wrong answer', category: 'situation' as const },
      { id: '35', text: 'Charlie answered immediately but got it wrong', category: 'situation' as const },
      { id: '36', text: 'Player\'s voice trailed off: "I think it\'s maybe..."', category: 'situation' as const },
      { id: '37', text: 'Charlie sounded unsure and guessed incorrectly', category: 'situation' as const },
      { id: '38', text: 'Player took too long and missed the time limit', category: 'situation' as const },
      { id: '39', text: 'Charlie confidently gave the wrong answer', category: 'situation' as const },
      { id: '40', text: 'Player mumbled their incorrect guess', category: 'situation' as const },
      { id: '41', text: 'Charlie said "Oh wait, no..." but time was up', category: 'situation' as const },
      { id: '42', text: 'Player gave two different answers and both were wrong', category: 'situation' as const },
      { id: '43', text: 'Charlie paused too long before guessing incorrectly', category: 'situation' as const },
      { id: '44', text: 'Player spoke too quietly and then got it wrong', category: 'situation' as const },
      { id: '45', text: 'Charlie said "I have no idea" and made a wild guess', category: 'situation' as const }
    ]

    if (isCorrect === true) {
      return correctExamples
    } else if (isCorrect === false) {
      return incorrectExamples
    }
    
    // Return all examples if isCorrect is not specified
    return [...correctExamples, ...incorrectExamples]
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

  answer_steal: (settings) => {
    const isCorrect = settings?.isCorrect
    
    const correctStealExamples = [
      // Player actions - Successful steals
      { id: '1', text: 'Ada said "Taylor Swift" and Maya successfully stole with "Shake It Off!"', category: 'player_action' as const },
      { id: '2', text: 'Charlie guessed "Queen" then Jordan correctly completed with "Bohemian Rhapsody"', category: 'player_action' as const },
      { id: '3', text: 'Emilio said "Hotel California" and Ada stole the points with "Eagles!"', category: 'player_action' as const },
      { id: '4', text: 'Maya answered "Beatles" then Riley completed the steal with "Hey Jude"', category: 'player_action' as const },
      { id: '5', text: 'Charlie said "Rolling Stones" and Emilio got the steal with "Paint It Black"', category: 'player_action' as const },
      { id: '6', text: 'Ada guessed "Thriller" then Jordan successfully stole with "Michael Jackson!"', category: 'player_action' as const },
      { id: '7', text: 'Charlie said "Led Zeppelin" and Maya completed the steal with "Stairway to Heaven"', category: 'player_action' as const },
      { id: '8', text: 'Emilio answered "Don\'t Stop Believin\'" then Ada correctly stole with "Journey!"', category: 'player_action' as const },
      { id: '9', text: 'Jordan said "Purple Rain" and Riley successfully added "Prince!"', category: 'player_action' as const },
      { id: '10', text: 'Maya guessed "Nirvana" then Charlie got the steal with "Smells Like Teen Spirit"', category: 'player_action' as const },
      
      // Game descriptions - Successful steals
      { id: '11', text: 'Great teamwork steal on this 1980s rock classic', category: 'game_description' as const },
      { id: '12', text: 'Fast steal that completed the correct answer', category: 'game_description' as const },
      { id: '13', text: 'Second player got the points with the missing artist', category: 'game_description' as const },
      { id: '14', text: 'Smart steal on this Beatles hit', category: 'game_description' as const },
      { id: '15', text: 'Good steal with the right song title', category: 'game_description' as const },
      { id: '16', text: 'Clever steal on this classic Motown track', category: 'game_description' as const },
      { id: '17', text: 'Player 2 finished the answer and took the points', category: 'game_description' as const },
      { id: '18', text: 'Well-timed steal on this 90s hit', category: 'game_description' as const },
      { id: '19', text: 'Second player knew exactly which song that was', category: 'game_description' as const },
      { id: '20', text: 'Steal worked out on this classic rock anthem', category: 'game_description' as const },
      
      // Situations - Successful steals
      { id: '21', text: 'Second player jumped in within 2 seconds of the partial answer', category: 'situation' as const },
      { id: '22', text: 'Perfect steal timing - got it before the first player could complete it', category: 'situation' as const },
      { id: '23', text: 'Second player was ready and waiting to complete that answer', category: 'situation' as const },
      { id: '24', text: 'Quick steal happened while first player was still thinking', category: 'situation' as const },
      { id: '25', text: 'Second player confidently completed the partial guess', category: 'situation' as const },
      { id: '26', text: 'Steal completed just as the first player paused', category: 'situation' as const },
      { id: '27', text: 'Second player spoke up immediately after hearing the artist name', category: 'situation' as const },
      { id: '28', text: 'Perfect steal execution - no hesitation from the second player', category: 'situation' as const },
      { id: '29', text: 'Second player jumped on that partial answer instantly', category: 'situation' as const },
      { id: '30', text: 'Quick steal while the first player was still speaking', category: 'situation' as const }
    ]

    const failedStealExamples = [
      // Player actions - Failed steals
      { id: '1', text: 'Ada said "Taylor Swift" then Maya failed the steal with "Bad Blood" but it was "Shake It Off"', category: 'player_action' as const },
      { id: '2', text: 'Charlie guessed "Queen" and Jordan attempted to steal with "We Will Rock You" but it was "Bohemian Rhapsody"', category: 'player_action' as const },
      { id: '3', text: 'Emilio said "Hotel California" and Ada tried to steal with "Fleetwood Mac" instead of "Eagles"', category: 'player_action' as const },
      { id: '4', text: 'Maya answered "Beatles" then Riley\'s steal attempt "Yesterday" was wrong - it was "Hey Jude"', category: 'player_action' as const },
      { id: '5', text: 'Charlie said "Rolling Stones" and Emilio\'s steal failed with "Satisfaction"', category: 'player_action' as const },
      { id: '6', text: 'Ada guessed "Thriller" then Jordan failed the steal with "Prince!" instead of "Michael Jackson"', category: 'player_action' as const },
      { id: '7', text: 'Charlie said "Led Zeppelin" and Maya\'s steal attempt "Black Dog" was wrong - it was "Stairway to Heaven"', category: 'player_action' as const },
      { id: '8', text: 'Emilio answered "Don\'t Stop Believin\'" then Ada unsuccessfully tried "Boston!" instead of "Journey"', category: 'player_action' as const },
      { id: '9', text: 'Jordan said "Purple Rain" and Riley\'s steal failed with "1999" - it was the artist "Prince"', category: 'player_action' as const },
      { id: '10', text: 'Maya guessed "Nirvana" then Charlie\'s steal attempt failed with "Come As You Are"', category: 'player_action' as const },
      
      // Game descriptions - Failed steals
      { id: '11', text: 'Steal attempt failed - wrong artist for this 1980s classic', category: 'game_description' as const },
      { id: '12', text: 'Unsuccessful steal - second player guessed wrong song by same artist', category: 'game_description' as const },
      { id: '13', text: 'Failed steal attempt - got a different song from the same album', category: 'game_description' as const },
      { id: '14', text: 'Steal didn\'t work - wrong Beatles song guess', category: 'game_description' as const },
      { id: '15', text: 'Failed steal - second player confused it with another hit by that artist', category: 'game_description' as const },
      { id: '16', text: 'Second player mixed up the artist on this Motown classic', category: 'game_description' as const },
      { id: '17', text: 'Failed completion - wrong song title guess', category: 'game_description' as const },
      { id: '18', text: 'Steal attempt missed on this 90s hit', category: 'game_description' as const },
      { id: '19', text: 'Second player got the wrong artist for that song', category: 'game_description' as const },
      { id: '20', text: 'Steal failed - confused with a similar-sounding band', category: 'game_description' as const },
      
      // Situations - Failed steals
      { id: '21', text: 'Second player jumped in too quickly and got it wrong', category: 'situation' as const },
      { id: '22', text: 'Steal attempt failed - second player was overconfident', category: 'situation' as const },
      { id: '23', text: 'Second player hesitated then guessed incorrectly', category: 'situation' as const },
      { id: '24', text: 'Failed steal - second player mixed up similar artists', category: 'situation' as const },
      { id: '25', text: 'Second player tried to steal but got the completion wrong', category: 'situation' as const },
      { id: '26', text: 'Steal failed when second player said the wrong song title', category: 'situation' as const },
      { id: '27', text: 'Second player spoke up but gave an incorrect answer', category: 'situation' as const },
      { id: '28', text: 'Failed steal - second player guessed another song by same artist', category: 'situation' as const },
      { id: '29', text: 'Second player jumped on the partial answer but got it wrong', category: 'situation' as const },
      { id: '30', text: 'Steal attempt backfired with an incorrect completion', category: 'situation' as const }
    ]

    if (isCorrect === true) {
      return correctStealExamples
    } else if (isCorrect === false) {
      return failedStealExamples
    }
    
    // Return all examples if isCorrect is not specified
    return [...correctStealExamples, ...failedStealExamples]
  },

  playlist_selection: () => [
    // Observable patterns - Same playlist selections
    { id: '1', text: 'Charlie selected "2000s" for the third game in a row', category: 'player_action' as const },
    { id: '2', text: 'Maya picked "Today\'s Top Hits" again - that\'s her fourth time this session', category: 'player_action' as const },
    { id: '3', text: 'Ada chose "Divas" for the second consecutive round', category: 'player_action' as const },
    { id: '4', text: 'Jordan went back to "90s" after trying it earlier', category: 'player_action' as const },
    { id: '5', text: 'Riley selected "Meme Songs" twice in the last four rounds', category: 'player_action' as const },

    // Observable patterns - Different decades/eras
    { id: '6', text: 'Charlie jumped from "70s" straight to "2020s" - a 50-year leap', category: 'game_description' as const },
    { id: '7', text: 'Maya went from "80s" to "2010s" to "2000s" - working backwards through decades', category: 'game_description' as const },
    { id: '8', text: 'Ada selected "Songs of the Summer" after three decade-based playlists', category: 'game_description' as const },
    { id: '9', text: 'Jordan chose "All Time Pop!" after focusing on specific decades', category: 'game_description' as const },
    { id: '10', text: 'Riley picked "70s" - the oldest decade playlist available', category: 'game_description' as const },

    // Observable patterns - Genre/style switches  
    { id: '11', text: 'Charlie switched from "Boybands vs Girlbands" to "One Hit Wonders" - completely different styles', category: 'game_description' as const },
    { id: '12', text: 'Maya went from serious "Divas" to silly "Meme Songs"', category: 'game_description' as const },
    { id: '13', text: 'Ada chose "Today\'s Top Hits" after playing three retro decades', category: 'game_description' as const },
    { id: '14', text: 'Jordan selected modern "2020s" after old-school "80s"', category: 'game_description' as const },
    { id: '15', text: 'Riley picked theme-based "Songs of the Summer" instead of decade playlists', category: 'game_description' as const },

    // Observable behaviors - Selection speed and hesitation
    { id: '16', text: 'Charlie immediately picked "90s" without hesitation', category: 'situation' as const },
    { id: '17', text: 'Maya scrolled through all playlist options twice before choosing', category: 'situation' as const },
    { id: '18', text: 'Ada hovered over "80s" then switched to "All Time Pop!" at the last second', category: 'situation' as const },
    { id: '19', text: 'Jordan spent 30 seconds deciding between "2000s" and "2010s"', category: 'situation' as const },
    { id: '20', text: 'Riley quickly selected "Boybands vs Girlbands" as soon as their turn started', category: 'situation' as const },

    // Observable patterns - Strategic vs random selection
    { id: '21', text: 'Charlie avoided "Divas" - the playlist they struggled with last session', category: 'situation' as const },
    { id: '22', text: 'Maya picked "One Hit Wonders" after dominating the previous three playlists', category: 'situation' as const },
    { id: '23', text: 'Ada selected "80s" - the only decade playlist she hasn\'t tried yet', category: 'situation' as const },
    { id: '24', text: 'Jordan chose "Meme Songs" to break their pattern of decade selections', category: 'situation' as const },
    { id: '25', text: 'Riley went with "Today\'s Top Hits" after struggling with older music', category: 'situation' as const },

    // Observable variety and exploration
    { id: '26', text: 'Charlie has now tried six different playlists this session', category: 'game_description' as const },
    { id: '27', text: 'Maya selected her first non-decade playlist with "All Time Pop!"', category: 'game_description' as const },
    { id: '28', text: 'Ada chose "70s" - exploring every decade chronologically', category: 'game_description' as const },
    { id: '29', text: 'Jordan picked "Songs of the Summer" for the first time this session', category: 'player_action' as const },
    { id: '30', text: 'Riley has stuck to theme playlists, avoiding decade-specific ones', category: 'game_description' as const }
  ],

  banter: () => [
    // Lull moments where banter would be appropriate
    { id: '1', text: 'There\'s a natural pause while the next playlist is loading', category: 'situation' as const },
    { id: '2', text: 'Players are taking a water break between rounds', category: 'situation' as const },
    { id: '3', text: 'Maya is scrolling through playlist options, taking time to decide', category: 'player_action' as const },
    { id: '4', text: 'Everyone just finished discussing a song they all recognized', category: 'situation' as const },
    { id: '5', text: 'The group is waiting for the next round to begin', category: 'situation' as const },

    // Session patterns and observations for banter topics
    { id: '6', text: 'Charlie has been consistently strong on rock songs tonight', category: 'game_description' as const },
    { id: '7', text: 'The group has played three different decade playlists so far', category: 'game_description' as const },
    { id: '8', text: 'Maya mentioned her parents\' music collection earlier', category: 'player_action' as const },
    { id: '9', text: 'Ada shows excitement every time a powerful vocalist comes on', category: 'game_description' as const },
    { id: '10', text: 'Jordan surprised everyone with knowledge of deep cuts', category: 'game_description' as const },

    // Transition moments perfect for commentary
    { id: '11', text: 'Players just switched from "90s" to "2020s" playlist - big era jump', category: 'game_description' as const },
    { id: '12', text: 'The group went from serious "Divas" to silly "Meme Songs"', category: 'game_description' as const },
    { id: '13', text: 'Session has covered 50+ years of music across multiple genres', category: 'game_description' as const },
    { id: '14', text: 'Everyone just heard a song that was popular during their high school years', category: 'situation' as const },
    { id: '15', text: 'The last three songs all hit #1 in different decades', category: 'game_description' as const },

    // Energy and atmosphere observations
    { id: '16', text: 'Room energy is high - everyone is engaged and having fun', category: 'situation' as const },
    { id: '17', text: 'Players are starting to share personal music stories', category: 'situation' as const },
    { id: '18', text: 'Someone just mentioned this song being on their road trip playlist', category: 'player_action' as const },
    { id: '19', text: 'The group is humming along to songs before answering', category: 'situation' as const },
    { id: '20', text: 'Everyone seems relaxed and comfortable with each other', category: 'situation' as const },

    // Perfect moments for host commentary
    { id: '21', text: 'Natural conversation lull as players get settled for next round', category: 'situation' as const },
    { id: '22', text: 'Players are discussing how different each decade sounds', category: 'situation' as const },
    { id: '23', text: 'Someone just made a connection between two songs from different eras', category: 'player_action' as const },
    { id: '24', text: 'The group discovered they all know the same obscure B-side track', category: 'situation' as const },
    { id: '25', text: 'Players are debating which decade had the best music', category: 'situation' as const },

    // Session flow observations
    { id: '26', text: 'This is the final playlist selection of the session', category: 'game_description' as const },
    { id: '27', text: 'Group has explored six different playlists tonight', category: 'game_description' as const },
    { id: '28', text: 'Players have shown knowledge across multiple musical eras', category: 'game_description' as const },
    { id: '29', text: 'Someone keeps picking the same type of playlist repeatedly', category: 'game_description' as const },
    { id: '30', text: 'The session has had a good mix of familiar hits and deep cuts', category: 'game_description' as const }
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

// Detailed Context Examples for longer game history
const songQuizDetailedContextExamples: DetailedContextExample[] = [
  {
    id: '1',
    title: '80s to 90s Recovery',
    description: 'Player bounced back after struggling with previous game',
    text: `Previous Game: Charlie lost the 80s playlist game with 2 of 5 correct answers. Struggled with "Don't You (Forget About Me)" by Simple Minds and "Blue Monday" by New Order.

Current Game: 90s playlist, Round 3 of 5. Charlie has gotten 3 correct and 0 incorrect so far. Previous correct answers were "Smells Like Teen Spirit" by Nirvana, "Creep" by Radiohead, and "Wonderwall" by Oasis.

Recent Riley responses: "Nice recovery from last game!", "You're finding your groove now!", "That's more like the Charlie I know!"

Charlie just heard the opening guitar riff and shouted "Black" by Pearl Jam but the song was actually "Alive" by Pearl Jam.`
  },
  {
    id: '2',
    title: 'Hot Streak Continues',
    description: 'Player on fire across multiple games',
    text: `Previous Game: Maya dominated the Classic Rock playlist with 4 of 5 correct, only missing "More Than a Feeling" by Boston.

Current Game: Pop Hits 2000s, Round 4 of 5. Maya has a perfect 4 correct, 0 incorrect streak going. Previous answers: "Hey Ya!" by OutKast, "Crazy" by Gnarls Barkley, "Hips Don't Lie" by Shakira, and "SexyBack" by Justin Timberlake.

Recent Riley responses: "You're absolutely on fire!", "Someone's been studying their music!", "Perfect game so far - can you make it 5 for 5?"

Maya confidently said "I Kissed a Girl by Katy Perry" within 2 seconds of the song starting and nailed it.`
  },
  {
    id: '3',
    title: 'Multiplayer Comeback Battle',
    description: 'Tight competition between two players',
    text: `Previous Game: Emilio beat Jordan 3-2 in the Hip-Hop Classics playlist. Jordan missed "Rapper's Delight" and "The Message" but got the others.

Current Game: Alternative Rock 90s, Multiplayer. Current scores - Emilio: 18 points (2 correct), Jordan: 15 points (2 correct, 1 steal attempt failed). 

Game History: Jordan missed stealing "Loser" by Beck from Emilio, then both got "Under the Bridge" and "Jane Says" by Jane's Addiction correct.

Recent Riley responses: "This is getting competitive!", "Jordan's not giving up easily!", "Both of you know your alternative rock!"

Jordan just attempted to steal after Emilio said "Stone Temple..." but Jordan guessed "Interstate Love Song" when it was actually "Plush" by Stone Temple Pilots.`
  },
  {
    id: '4',
    title: 'Learning from Mistakes',
    description: 'Player showing improvement after rough start',
    text: `Previous Game: Ada struggled with Country Hits, finishing 1 of 5 correct. Only got "Friends in Low Places" by Garth Brooks, missed everything else including "Mammas Don't Let Your Babies Grow Up to Be Cowboys."

Current Game: Pop Rock playlist, Round 2 of 5. Ada started slow missing "Don't Stop Me Now" by Queen, but just got "Sweet Child O' Mine" by Guns N' Roses correct.

Recent Riley responses: "Don't worry about the rough start!", "There we go - you're getting warmed up!", "Much better! You know your rock classics!"

Ada is being more careful now, taking 4-5 seconds to think before answering. She just heard piano intro and said "Tiny Dancer by Elton John" and got it right.`
  },
  {
    id: '5',
    title: 'Genre Switch Challenge',
    description: 'Player adapting to completely different music style',
    text: `Previous Game: Riley dominated Metal playlist with 5 of 5 correct - "Master of Puppets," "Paranoid," "Ace of Spades," "Run to the Hills," and "Breaking the Law."

Current Game: Folk/Acoustic playlist (complete genre switch). Round 1 of 5. This is Riley's weak spot - already missed "The Sound of Silence" by Simon & Garfunkel, guessing it was by Bob Dylan.

Recent Riley responses: "Big genre switch here!", "Metal to folk - that's quite a jump!", "Don't worry, different muscles needed for this one!"

Riley just heard harmonica intro and hesitantly said "Blowin' in the Wind... by Bob Dylan?" and got it correct, showing signs of adapting to the new genre.`
  },
  {
    id: '6',
    title: 'Strategic Playlist Selection',
    description: 'Player chose playlist tactically after analyzing group strengths',
    text: `Previous Rounds: Maya dominated "2000s" (4/5 correct), Charlie struggled with "90s" (1/5), Ada excelled at "Divas" (5/5), Jordan was average on "Meme Songs" (3/5).
Current Situation: It's Charlie's turn to pick the next playlist. Group is tied 12-12-11-10 points. Charlie studied everyone's performance and selected "80s" - knowing it's Maya's weak spot from earlier games.
Recent Riley responses: "Smart strategic thinking!", "Charlie's playing the long game here!", "Good choice to shake things up!"
The 80s playlist just loaded up and Maya looked nervous, exactly what Charlie was hoping for when making this tactical selection.`
  },
  {
    id: '7', 
    title: 'Comfort Zone Playlist Pick',
    description: 'Player selected familiar playlist after struggling with challenging rounds',
    text: `Previous Games: Jordan bombed "One Hit Wonders" (1/5), barely survived "Boybands vs Girlbands" (2/5), and struggled with "All Time Pop!" (2/5).
Current Situation: Jordan's confidence is shaken. Score: Ada 18, Maya 16, Charlie 14, Jordan 8. It's Jordan's turn to select and they chose "Today's Top Hits" - their comfort zone.
Recent Riley responses: "Sometimes you gotta play to your strengths!", "Smart move going with what you know!", "Nothing wrong with playing it safe!"
Jordan immediately relaxed when "Anti-Hero by Taylor Swift" started playing, confidently calling it out within 2 seconds - exactly the confidence boost they needed.`
  },
  {
    id: '8',
    title: 'Surprise Playlist Challenge', 
    description: 'Group reacted to unexpected playlist selection with mixed emotions',
    text: `Session History: Group has played "2010s," "Songs of the Summer," and "All Time Pop!" - all mainstream, predictable choices that everyone felt comfortable with.
Current Moment: Ada shocked everyone by selecting "Meme Songs" playlist. Maya groaned "Oh no, not the weird ones!", Charlie laughed nervously, Jordan said "This should be interesting..."
Recent Riley responses: "Ooh, curveball playlist!", "Ada's mixing things up!", "Get ready for some surprises!"
First song was "Never Gonna Give You Up by Rick Astley" and everyone burst out laughing - Ada's bold playlist choice completely changed the room's energy from competitive to fun and silly.`
  },
  {
    id: '9',
    title: 'Nostalgia Playlist Selection',
    description: 'Emotional playlist choice triggered memories and personal connections',
    text: `Context: Maya mentioned earlier that her mom used to play 70s music every Sunday morning while cleaning the house. Group has been playing modern playlists all session.
Current Pick: Maya selected "70s" playlist saying "Time for some childhood memories!" Her eyes lit up as she explained her connection to this era.
Recent Riley responses: "Love the personal touch!", "70s brings back the feels!", "Nothing like music that tells your story!"
"Dancing Queen by ABBA" started playing and Maya immediately started singing along with tears in her eyes, telling the group "This was mom's absolute favorite song" - the whole room got emotional and supportive.`
  },
  {
    id: '10',
    title: 'Host Commentary During Playlist Loading',
    description: 'Riley fills transition time with music trivia and observations',
    text: `Current Situation: Jordan just selected "80s" playlist after the group played "2000s," "90s," and "2010s." The playlist is loading and there's a natural lull in conversation.
Session Context: The group has shown strong knowledge of recent decades but hasn't tackled the 80s yet. Maya mentioned earlier she grew up on her parents' 80s collection.
Riley's banter opportunity: "You know, the 80s were wild - artists literally invented new sounds because they got their hands on synthesizers and drum machines for the first time. Plus Maya, I have a feeling you're about to school everyone here based on what you mentioned about your parents' collection. The 80s had this thing where a song could sound completely futuristic and totally nostalgic at the same time. We're talking the decade that gave us both 'Take On Me' and 'Don't Stop Believin'' - talk about range!"
The playlist loads up and everyone's laughing and energized from Riley's commentary, ready to tackle the decade with renewed enthusiasm.`
  },
  {
    id: '11',
    title: 'Observational Banter About Player Patterns', 
    description: 'Riley comments on interesting gameplay trends they\'ve noticed',
    text: `Session History: Over 6 rounds, Charlie has been consistently faster on rock songs than pop, Ada dominates anything with strong vocals, Maya knows every 90s alternative track, and Jordan surprises with deep cuts.
Current Moment: The group is between rounds, taking a short break. There's a natural pause in conversation as people grab water and get comfortable.
Riley's banter: "Okay, I have to share what I've been noticing here - we've got some serious musical DNA showing up. Charlie, you light up on anything with a guitar solo, like you can sense it coming three notes early. Ada, you've called out every powerhouse vocalist before they even hit their big note. Maya, I think you had a direct line to every college radio station in the 90s. And Jordan - those deep cuts! You're pulling out B-sides like they're your greatest hits. It's like watching a master class in how different people connect with music."
Everyone starts laughing and comparing their musical backgrounds, leading to stories about how they first discovered their favorite artists.`
  },
  {
    id: '12',
    title: 'Cultural Commentary Banter',
    description: 'Riley connects the music to broader cultural moments and trends',
    text: `Game Context: The group has played songs spanning from 1970s to today across multiple playlists. Songs have included "Billie Jean," "Smells Like Teen Spirit," "Hey Ya!," and "Anti-Hero."
Moment: There's a brief pause as the next playlist loads, and people are discussing how different the songs feel from each decade.
Riley's cultural banter: "What's blowing my mind right now is that we just time-traveled through 50 years of culture in 30 minutes. Like, we went from disco-era optimism to grunge's questioning everything, to Y2K's party energy, to today's hyper-personal songwriting. Each of these songs was the soundtrack to someone's world changing. 'Billie Jean' was playing when MTV started, 'Smells Like Teen Spirit' defined a generation's rebellion, 'Hey Ya!' got everyone through the early 2000s, and 'Anti-Hero' is literally everyone's therapy session set to music. We're not just playing songs - we're playing the emotional history of America!"
The group gets into an animated discussion about how music reflects the times, with everyone sharing which eras speak to them most.`
  },
  {
    id: '13',
    title: 'Energy Building Banter Before Big Moment',
    description: 'Riley creates anticipation and excitement during natural game lulls',
    text: `Situation: It's the final playlist selection and everyone's been having an amazing time. Maya's turn to pick and she's taking her time scrolling through options, creating natural anticipation.
Session Energy: Everyone is leaning forward, totally engaged, with lots of laughter and genuine excitement throughout the session.
Riley's anticipation banter: "Okay Maya, I can practically see the wheels turning over there! This is one of those moments where you can feel the music magic in the air. Are we going with a comfort zone pick? A curveball to shake things up? Something totally unexpected? You know what I love about this moment? Whatever you choose, it's going to be perfect because that's how music works - it always knows exactly what we need. The music gods are definitely watching this decision!"
Maya grins and dramatically selects "One Hit Wonders," causing everyone to burst out laughing and clapping, setting up the perfect energy for the final round with pure musical joy.`
  }
]

export function getDetailedContextExamples(product: ProductType = 'songquiz'): DetailedContextExample[] {
  // For now, only Song Quiz examples
  if (product === 'songquiz') {
    return songQuizDetailedContextExamples
  }
  
  return []
}

export function getRandomDetailedContextExample(product: ProductType = 'songquiz'): DetailedContextExample | null {
  const examples = getDetailedContextExamples(product)
  if (examples.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * examples.length)
  return examples[randomIndex]
}