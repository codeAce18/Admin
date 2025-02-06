import React, { useEffect } from 'react'
import Loader from '../components/Loader.tsx'
import ScrollToTop from '../components/ScrollToTop.tsx';
import Dashboardkpi from '../components/dashboard/Dashboardkpi.tsx';
import LineChart from '../components/dashboard/LineChart.tsx';
import Title from '../components/Title.tsx';
import { BarChart } from '../components/dashboard/BarChart.tsx';
import PieChart from '../components/dashboard/PieChart.tsx';
import Topplayers from '../components/dashboard/Topplayers.tsx';
import { useAppContext } from '../context/index.tsx';
import { getSessionSumForWeek, getStatsAndCounts, getUsersPerLevelPercentage, viewDailyActiveUsers, viewTopPlayers } from '../scripts/fetch.ts';
import { useLocation } from 'react-router-dom';


const Home = () => {
    const location = useLocation();
    const {
        token,
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
        setTopplayers,

    } = useAppContext();
    const load = async () => {
        const res = await getStatsAndCounts(token);
        setActivePlayersCount(res.active_users);
        setPlayersCount(res.total_users);
        setDailyPlayerCount(res.daily_users);

        const res2 = await viewDailyActiveUsers(token);
        setDailyActiveUsersData(res2);

        const res3 = await getSessionSumForWeek(token);
        setWeekSessionsData(res3);

        const res4 = await getUsersPerLevelPercentage(token);
        setPercentPerlevel(res4);

        const res5 = await viewTopPlayers(token);
        setTopplayers(res5);
        // console.log(res5);
        

    }
    useEffect(() => {
        load();
    }, [location]);

    return (
        <div className='h-full'>
            <Title title="DASHBOARD" />
            <Dashboardkpi playersCount={playersCount} activePlayersCount={activePlayersCount} dailyPlayerCount={dailyPlayerCount} />
            <div className="row">
                <LineChart props={{ dailyActiveUsersData: dailyActiveUsersData }} />
                <BarChart props={{ weekSessionsData: weekSessionsData }} />
                <PieChart props={{ percentPerlevel:percentPerlevel}}/>
            </div>
            <Topplayers />

            <Loader />

            <ScrollToTop />
        </div>
    )
}

export default Home