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
      name: players.length === 0 ? 'Charlie' : `Player ${players.length + 1}`,
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          👥 Player Configuration
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {players.length} player{players.length !== 1 ? 's' : ''} • {gameMode}
          </span>
          {gameMode === 'multiplayer' && players.length < 6 && (
            <button
              onClick={addPlayer}
              className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Condensed Player List */}
      <div className="flex flex-wrap gap-2">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border">
            <div className="flex items-center gap-2 min-w-0">
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                className="w-24 text-sm font-medium rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-transparent"
                placeholder="Player name"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={player.score}
                onChange={(e) => updatePlayer(index, 'score', parseInt(e.target.value) || 0)}
                className="w-16 text-xs rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0"
                min="0"
              />
              <span className="text-xs text-gray-500">pts</span>
            </div>

            {gameMode === 'multiplayer' && players.length > 1 && (
              <button
                onClick={() => removePlayer(index)}
                className="text-red-500 hover:text-red-700 ml-1"
                title="Remove player"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Quick Summary */}
      {players.length > 1 && (
        <div className="text-xs text-gray-600">
          Leader: <span className="font-medium">
            {players.reduce((leader, player) => player.score > leader.score ? player : leader).name}
          </span> ({players.reduce((max, player) => Math.max(max, player.score), 0)} pts)
        </div>
      )}
    </div>
  )
}