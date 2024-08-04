'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EnterPin from '@/components/enterPin/enterPin';
import SearchPopup from '@/components/SearchPopup';

export default function Home() {
  const router = useRouter();

  const [showPinPopup, setShowPinPopup] = useState<string | null>(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleCutoffClick = () => {
    setShowPinPopup('/cutoff');
  };

  const handleReceiptClick = () => {
    setShowPinPopup('/receipt');
  };

  const handleClosePinPopup = () => {
    setShowPinPopup(null);
  };

  const handleSearchClick = () => {
    setShowSearchPopup(true);
  };

  const handleCloseSearchPopup = () => {
    setShowSearchPopup(false);
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  return (
    <div className="bg-backColor w-full min-h-screen flex items-center justify-center">
      <div className="bg-inherit w-1/2 p-6">
        <h1 className="text-4xl text-white mb-10 text-center font-serif">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <ButtonWithIcon src="/dPos.png" text="POS" bgColor="bg-customGray" />
          <ButtonWithIcon src="/dCutoff.png" text="CUT OFF" bgColor="bg-customGray" onClick={handleCutoffClick} />
          <ButtonWithIcon src="/dReceipt.png" text="RECEIPT" bgColor="bg-customGray" onClick={handleReceiptClick} />
          <ButtonWithIcon src="/dSearch.png" text="SEARCH" bgColor="bg-customGray" onClick={handleSearchClick} />
          <ButtonWithIcon src="/dSettings.png" text="SETTINGS" bgColor="bg-customGray" onClick={handleSettingsClick} />
          <ButtonWithIcon src="/dLogout.png" text="LOG OUT" bgColor="bg-customGray" onClick={handleLogout} />
        </div>
      </div>

      {showPinPopup && <EnterPin redirectTo={showPinPopup} onClose={handleClosePinPopup} />}
      {showSearchPopup && <SearchPopup onClose={handleCloseSearchPopup} />}
    </div>
  );
}

function ButtonWithIcon({ src, text, bgColor, onClick }) {
  return (
    <button
      className={`flex flex-col items-center ${bgColor} text-white p-4 rounded-2xl shadow hover:bg-opacity-80`}
      onClick={onClick}
    >
      <div className="relative w-12 h-12 mb-2">
        <Image src={src} alt={text} layout="fill" objectFit="contain" />
      </div>
      <span className='font-thin text-2xl font-advent'>{text}</span>
    </button>
  );
}