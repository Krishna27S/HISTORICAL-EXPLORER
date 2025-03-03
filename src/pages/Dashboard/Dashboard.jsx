import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiSpellBook, GiScrollQuill, GiAncientSword, GiTreasureMap } from 'react-icons/gi';
import { FaUserCircle, FaClock, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = ({ currentUser, currentDateTime }) => {
  const navigate = useNavigate();

  const stats = [
    { 
      icon: <GiScrollQuill className="w-8 h-8" />,
      title: "Explorations",
      value: "42"
    },
    {
      icon: <GiSpellBook className="w-8 h-8" />,
      title: "Records",
      value: "128"
    },
    {
      icon: <GiTreasureMap className="w-8 h-8" />,
      title: "Quests",
      value: "7"
    },
    {
      icon: <FaHistory className="w-8 h-8" />,
      title: "Time Periods",
      value: "15"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1a0f0f]">
      {/* Header */}
      <header className="bg-[#2a1f1f] border-b border-amber-900/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GiAncientSword className="text-amber-500 w-8 h-8 mr-3" />
              <div>
                <h1 className="text-2xl font-medieval text-amber-100">
                  Explorer Dashboard
                </h1>
                <p className="text-amber-400/60 text-sm">
                  Welcome, {currentUser}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-amber-100/60 text-sm flex items-center">
                <FaClock className="mr-2" />
                {currentDateTime}
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/30 
                         text-amber-100 rounded-lg hover:bg-red-800/40 
                         transition-colors duration-300 border border-red-800/30"
              >
                <FaSignOutAlt />
                <span>Leave Portal</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#2a1f1f] rounded-lg p-6 border border-amber-900/30
                         hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="text-amber-500">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-amber-100/60 text-sm">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-medieval text-amber-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2a1f1f] rounded-lg p-6 border border-amber-900/30">
            <h2 className="text-xl font-medieval text-amber-100 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/mystical-realm')}
                className="p-4 bg-[#1a0f0f] rounded-lg border border-amber-900/20
                         hover:border-amber-500/50 transition-all duration-300"
              >
                <GiSpellBook className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <span className="text-amber-100 text-sm">Mystical Realm</span>
              </button>
              <button 
                className="p-4 bg-[#1a0f0f] rounded-lg border border-amber-900/20
                         hover:border-amber-500/50 transition-all duration-300"
              >
                <GiScrollQuill className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <span className="text-amber-100 text-sm">New Quest</span>
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-[#2a1f1f] rounded-lg p-6 border border-amber-900/30">
            <h2 className="text-xl font-medieval text-amber-100 mb-4">
              Explorer Profile
            </h2>
            <div className="flex items-center space-x-4">
              <FaUserCircle className="w-16 h-16 text-amber-500" />
              <div>
                <p className="text-amber-100">{currentUser}</p>
                <p className="text-amber-400/60 text-sm">Level: Explorer</p>
                <p className="text-amber-400/60 text-sm">Joined: 2025-03-03</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;