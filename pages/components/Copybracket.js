import React from "react";
import {
  Bracket,
  BracketGame,
  BracketGenerator,
} from "react-tournament-bracket";

export default function Game() {
  const game15 = {
    id: "15",
    name: "15",
    scheduled: "12-14-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Perdedor de 14 si es necesario",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game14 = {
    id: "14",
    name: "14",
    scheduled: "12-13-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "Ganador de 12",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de Lower (13)",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game12 = {
    id: "12",
    name: "12",
    scheduled: "12-11-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "Ganador de 7",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 8",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game8 = {
    id: "8",
    name: "8",
    scheduled: "12-10-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "Ganador de 3",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 4",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game7 = {
    id: "7",
    name: "7",
    scheduled: "12-09-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "Ganador de 1",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 2",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game4 = {
    id: "4",
    name: "4",
    scheduled: "12-08-2022",
    sides: {
      home: {
        team: {
          id: "13",
          name: "Team 7",
          seed: 1,
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Team 8",
        },
        score: {
          score: 0,
        },
      },
      seed: {
        displayName: "A1",
        rank: 1,
        sourceGame: "1",
      },
    },
  };

  const game3 = {
    id: "3",
    name: "3",
    scheduled: "12-07-2022",
    sides: {
      home: {
        team: {
          id: "11",
          name: "Team 5",
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "12",
          name: "Team 6",
        },
        score: {
          score: 0,
        },
      },
    },
  };

  const game2 = {
    id: "2",
    name: "2",
    scheduled: "12-07-2022",
    sides: {
      home: {
        team: {
          id: "12",
          name: "Team 3",
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "13",
          name: "Team 4",
        },
        score: {
          score: 0,
        },
      },
    },
  };

  const game1 = {
    id: "1",
    name: "1",
    scheduled: "12-07-2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Team 1",
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Team 2",
        },
        score: {
          score: 0,
        },
      },
    },
  };

  const gameLower1 = {
    id: "5",
    name: "5",
    scheduled: "12/08/2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Perdedor de 1",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Perdedor de 2",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  const gameLower2 = {
    id: "6",
    name: "6",
    scheduled: "12-08-2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Perdedor de 3",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 0,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Perdedor de 4",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  const gameLower3 = {
    id: "10",
    name: "10",
    scheduled: "12/10/2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Perdedor de 8",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 5",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  const gameLower4 = {
    id: "9",
    name: "9",
    scheduled: "12/09/2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Perdedor de 7",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganadaor de 6",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  const gameLower5 = {
    id: "11",
    name: "11",
    scheduled: "12/11/2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Ganador de 10",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 9",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  const gameLower6 = {
    id: "13",
    name: "13",
    scheduled: "12/12/2022",
    sides: {
      home: {
        team: {
          id: "10",
          name: "Perdedor de 12",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A1",
          rank: 1,
          sourceGame: game2,
          sourcePool: {
            id: "1",
            name: "Pool A",
          },
        },
      },
      visitor: {
        team: {
          id: "11",
          name: "Ganador de 11",
        },
        score: {
          score: 0,
        },
        seed: {
          displayName: "A2",
          rank: 1,
          sourceGame: game3,
          sourcePool: {},
        },
      },
    },
  };

  return (
    <>
      <div
        className="overflow-x-auto p-2"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="">
          <div className="bg-red-100 bg-opacity-5 p-4">
            <p className="text-white text-center ">Upper</p>
          </div>
          <div className="flex p-4 flex-row">
            <div>
              <BracketGame game={game1} />
              <BracketGame game={game2} />
              <BracketGame game={game3} />
              <BracketGame game={game4} />
            </div>
            <div className="py-10 pl-10">
              <BracketGame game={game7} />
              <div className="pt-20">
                <BracketGame game={game8} />
              </div>
            </div>
            <div className="pt-[120px] pl-10">
              <BracketGame game={game12} />
            </div>
            <div className="pt-[120px] pl-10">
              <BracketGame game={game14} />
            </div>
            <div className="pt-[120px] pl-10">
              <BracketGame game={game15} />
            </div>
          </div>
          {/* <BracketGenerator games={games} /> */}
        </div>

        <div className="bg-red-100 bg-opacity-5 p-4">
          <p className="text-white text-center ">Lower</p>
        </div>
        <div className="flex flex-row">
          <div className="p-4">
            <BracketGame game={gameLower1} />
            <BracketGame game={gameLower2} />
          </div>
          <div className="pt-4 pl-6">
            <BracketGame game={gameLower3} />
            <BracketGame game={gameLower4} />
          </div>
          <div className="p-4 pl-10 relative top-10">
            <BracketGame game={gameLower5} />
          </div>
          <div className="p-4 pl-6 relative top-10">
            <BracketGame game={gameLower6} />
          </div>
        </div>
      </div>
    </>
  );
}
