"use client";
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {

    const [token, setToken] = useState(null);
    const [playersCount, setPlayersCount] = useState(0);
    const [activePlayersCount, setActivePlayersCount] = useState(0);
    const [dailyPlayerCount, setDailyPlayerCount] = useState(0);
    const [dailyActiveUsersData, setDailyActiveUsersData] = useState();
    const [weekSessionsData, setWeekSessionsData] = useState();
    const [percentPerlevel, setPercentPerlevel] = useState();
    const [topplayers, setTopplayers] = useState();
    const [activity, setActivity] = useState([]);
    const [allplayers, setAllPlayers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [levels, setLevels] = useState([]);

    return (
        <AppContext.Provider value={{
            token,
            setToken,
            playersCount,
            setPlayersCount,
            activePlayersCount,
            setActivePlayersCount,
            dailyPlayerCount,
            setDailyPlayerCount,
            dailyActiveUsersData,
            setDailyActiveUsersData,
            weekSessionsData,
            setWeekSessionsData,
            percentPerlevel,
            setPercentPerlevel,
            topplayers,
            setTopplayers,
            activity,
            setActivity,
            allplayers,
            setAllPlayers,
            tasks,
            setTasks,
            levels,
            setLevels


        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}