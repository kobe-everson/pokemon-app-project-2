import { AuthContext } from "./AuthContext";
import { createContext, useContext, useState, useEffect } from "react";

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);

  /* When a user changes (logs on/off), load and set the team */
  useEffect(() => {
    if (!user) {
      setTeam([]);
      return;
    }

    const teams = JSON.parse(localStorage.getItem("teams")) || {};
    const userTeam = teams[user.id] || [];
    setTeam(userTeam);
  }, [user]);

  const saveTeam = (newTeam) => {
    const teams = JSON.parse(localStorage.getItem("teams")) || {};
    teams[user.id] = newTeam;
    localStorage.setItem("teams", JSON.stringify(teams));
    setTeam(newTeam);
  };

  const addToTeam = (id) => {
    if (team.length >= 6) {
      return { success: false, message: "Your team is full (max 6 Pokémon)" };
    }

    if (team.includes(id)) {
      return {
        success: false,
        message: "This Pokémon is already on your team",
      };
    }

    const newTeam = [...team, id];
    saveTeam(newTeam);
    return { success: true };
  };

  const removeFromTeam = (id) => {
    const newTeam = team.filter((p) => p !== id);
    saveTeam(newTeam);
  };

  const isOnTeam = (id) => team.includes(id);

  return (
    <TeamContext.Provider
      value={{
        team,
        addToTeam,
        removeFromTeam,
        isOnTeam,
        teamFull: team.length >= 6,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
