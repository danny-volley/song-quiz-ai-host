import { GameMode, Player } from '../types'

interface PlayerConfigurationProps {
  gameMode: GameMode
  players: Player[]
  onPlayersChange: (players: Player[]) => void
}

export default function PlayerConfiguration({ gameMode, players, onPlayersChange }: PlayerConfigurationProps) {
  const updatePlayer = (index: number, field: keyof Player, value: string | number) => {
    const updatedPlayers = [...players]
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value
    }
    onPlayersChange(updatedPlayers)
  }

  const addPlayer = () => {
    const newPlayer: Player = {
      id: `player_${Date.now()}`,
      name: `Player ${players.length + 1}`,
      score: 0
    }
    onPlayersChange([...players, newPlayer])
  }

  const removePlayer = (index: number) => {
    if (players.length > 1) {
      const updatedPlayers = players.filter((_, i) => i !== index)
      onPlayersChange(updatedPlayers)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          👥 Player Configuration
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {gameMode === 'single' 
            ? 'Configure the single player for personalized responses.'
            : 'Set up multiple players with names and current scores.'
          }
        </p>
      </div>

      <div className="space-y-3">
        {players.map((player, index) => (
          <div key={player.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">
                {gameMode === 'single' ? 'Player' : `Player ${index + 1}`}
              </h4>
              {gameMode === 'multiplayer' && players.length > 1 && (
                <button
                  onClick={() => removePlayer(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  placeholder="Enter player name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Score
                </label>
                <input
                  type="number"
                  value={player.score}
                  onChange={(e) => updatePlayer(index, 'score', parseInt(e.target.value) || 0)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}

        {gameMode === 'multiplayer' && (
          <button
            onClick={addPlayer}
            disabled={players.length >= 6}
            className={`
              w-full p-3 border-2 border-dashed rounded-lg text-sm font-medium transition-colors
              ${players.length >= 6 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
              }
            `}
          >
            {players.length >= 6 ? 'Maximum 6 players' : '+ Add Another Player'}
          </button>
        )}
      </div>

      {/* Player Summary */}
      {players.length > 0 && (
        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-medium text-indigo-900 mb-2">
            {gameMode === 'single' ? 'Player Summary' : 'Current Standings'}
          </h4>
          <div className="space-y-1">
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm text-indigo-800">
                  <span>
                    {gameMode === 'multiplayer' && `#${index + 1} `}
                    {player.name}
                  </span>
                  <span className="font-medium">{player.score} points</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}