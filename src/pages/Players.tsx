import React, { useEffect, useState } from 'react'
import ScrollToTop from '../components/ScrollToTop.tsx'
import Title from '../components/Title.tsx'
import Table from '../components/tables/Table.tsx'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/index.tsx'
import { blockPlayer, unblockPlayer, viewAllPlayers } from '../scripts/fetch.ts'
import { showInfoMessage, showSuccessMessage } from '../scripts/utils.js'
import ConfirmBlockModal from '../components/tables/ConfirmBlockModal.tsx'

const Players = () => {
  const location = useLocation();
  const { token, allplayers, setAllPlayers, } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState();
  const [isBlock, setIsBlock] = useState(true);

  const load = async () => {
    const res = await viewAllPlayers(token);
    setAllPlayers(res);
    // console.log(res);


  }
  const handleBlock = (row) => {
    // alert(JSON.stringify(row)[]);
    if (row.is_blocked === 'Blocked') {

      setIsBlock(false);
    } else {
      setIsBlock(true);
    }
    setUserToBlock(row);
    setShowModal(true);
  }
  const block = async (row) => {
    const res = await blockPlayer(row.user_id, token);
    showSuccessMessage(JSON.stringify(res));
    load();
  }
  const unblock = async (row) => {
    const res = await unblockPlayer(row.user_id, token);
    showSuccessMessage(JSON.stringify(res));
    load();
  }
  useEffect(() => {
    load();
  }, [location]);

  // useEffect(() => {
  //   alert(isBlock)
  // }, [isBlock]);


  const columns = [
    { name: 'level_image_url', label: '', type: 'image' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'level', label: 'Level', type: 'text' },
    { name: 'level_name', label: 'Level Name', type: 'text' },
    { name: 'coin_balance', label: 'Coin Balance', type: 'price' },
    { name: 'wallet', label: 'Wallet', type: 'text' },
    { name: 'is_blocked', label: 'Status', type: 'status', }

  ]
  const data = allplayers;
  const actions = [
    { name: 'block', icon: 'ri-lock-star-fill', class: 'danger-light', callback: handleBlock }
  ];



  return (
    <div className='h-full'>
      <Title title="PLAYERS" />

      <ConfirmBlockModal block={isBlock === true ? block : unblock} isBlock={isBlock} user={userToBlock} setShowModal={setShowModal} showModal={showModal} />
      <Table props={{ title: 'All players', columns: columns, data, actions: actions }} />
      <ScrollToTop />
    </div>
  )
}

export default Players