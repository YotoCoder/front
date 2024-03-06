import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Cargador from "./Cargador";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const randonColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  // return `rgb(${r}, ${g}, ${b})`;
  return `rgb( 118, 193, 0)`;
};

////////////////////////////////////////////////////////////

const consultaMMrchampionshipPlayers = async () => {
  const url = "https://admin.vemastercup.com/mmrchampionship/1/jugadores";
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

const consultaMatchesByPlayers = async (player) => {
  const url = `https://api.opendota.com/api/players/${player}/matches/`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

const Gozu = ({ props }) => {
  const [players, setPlayers] = React.useState([]);
  const [matches, setMatches] = React.useState([]);

  const [partidas, setPartidas] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [fechasX, setFechasX] = useState(["", "", "", "", "", "", ""]);

  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    // cambiar el color del grid
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",

          // This more specific font property overrides the global property
          font: {
            size: 14,

          },
        },
      },
      title: {
        display: true,
        text: "Resultados por día",
      },
    },
  };

  let labels = [
    // eje X
    "10/04",
    "11/04",
    "12/04",
    "13/04",
    "14/04",
    "15/04",
    "16/04",
  ];

  labels = fechasX;

  const data = {
    labels, // eje X
    datasets: [
      // eje Y
      {
        label: props ? props.user.username : "VemasterCup",
        data: partidas,
        borderColor: randonColor(),
      },
    ],
  };

  const idAmigo = props ? props.id_amigo : 0;

  // consultar primero los jugadores de la mmr championship 1 y luego consultar los matches de cada uno de ellos
  // obtenner un array con el resultado diario de cada jugador ejemplo si gano 5 y perdio 7 el resultado seria -2
  useEffect(() => {
    consultaMMrchampionshipPlayers().then((data) => {
      console.log(data);
      setPlayers(data);
    });
  }, []);

  useEffect(() => {
    consultaMatchesByPlayers(idAmigo).then((matches) => {
      const startDate = new Date(2023, 3, 10); // 10 de abril de 2023
      const endDate = new Date(2023, 3, 30); // 30 de abril de 2023

      setLoading(true);

      fetch(`https://api.opendota.com/api/players/${idAmigo}/matches/`)
        .then((response) => response.json())
        .then((matches) => {
          const soloRankedMatches = matches.filter(
            (match) =>
              match.lobby_type === 7 && // modo solo ranked
              new Date(match.start_time * 1000) >= startDate && // dentro del rango de fechas
              new Date(match.start_time * 1000) <= endDate
          );

          const dailyStats = soloRankedMatches.reduce((stats, match) => {
            const date = new Date(match.start_time * 1000).toLocaleDateString();
            if (!stats[date]) {
              stats[date] = { wins: 0, losses: 0, total: 0 };
            }
            if (match.radiant_win === match.player_slot < 128) {
              stats[date].wins++;
            } else {
              stats[date].losses++;
            }
            return stats;
          }, {});

          for (const date in dailyStats) {
            dailyStats[date].total =
              dailyStats[date].wins - dailyStats[date].losses;
          }

          // console.log(dailyStats);

          const fechas = Object.entries(dailyStats).map(
            ([fecha, { wins, losses, total }]) => fecha
          );

          const resultados = Object.entries(dailyStats).map(
            ([fecha, { wins, losses, total }]) => total
          );

          // const wl = Object.entries(dailyStats).map(
          //   ([fecha, { wins, losses, total }]) => [wins, losses]
          // );

          console.log(fechas);

          fechas.reverse();
          resultados.reverse();

          setMatches([fechas, resultados]);

          setPartidas(resultados);
          setFechasX(fechas);

          setLoading(false);
        })
        .catch((error) => console.error(error));
    });
  }, [players]);

  return (
    !loading ? (
  <Line options={options} data={data} height={180} className="bg-black" />
  ) : (
    <Cargador height={'h-26'}/>
  )
  );
};

export default Gozu;
