import React from 'react';
import { useQuery } from "@tanstack/react-query";


function SaberSiHayPartida(props) {
  const { data } = useQuery(
    "get-lobby-from-player",
    async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-player`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${props.Token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      console.log("estoy mirando si hay partida");
      return data;
    },
    {
      refetchInterval: 1000, // Se ejecutará cada segundo
      refetchUntil: (data) => data !== null, // Continuará haciendo polling hasta que data sea distinto de null
    }
  );

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Mostrar datos de 'data' aquí */}
      <h1>aaaaaaaa</h1>
    </div>
  );
}

export default SaberSiHayPartida;
