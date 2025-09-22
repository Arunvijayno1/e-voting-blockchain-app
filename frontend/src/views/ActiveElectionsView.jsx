import React, { useState, useEffect } from 'react';
import { CalendarIcon, PlusCircleIcon } from '../components/Icons.jsx';

const ActiveElectionsView = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/elections');
      if (response.ok) {
        const data = await response.json();
        setElections(data);
      } else {
        setError('Failed to fetch elections.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateElection = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/elections/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, startDate, endDate }),
      });

      if (response.ok) {
        await fetchElections(); // Refresh the list
        setName('');
        setStartDate('');
        setEndDate('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Failed to create election.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-500/20 text-blue-300';
      case 'Ongoing':
        return 'bg-green-500/20 text-green-300';
      case 'Completed':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-yellow-500/20 text-yellow-300';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><PlusCircleIcon /> Create New Election</h2>
        {error && <p className="bg-red-500/30 text-red-300 text-center text-sm p-2 rounded-lg mb-4">{error}</p>}
        <form onSubmit={handleCreateElection} className="grid md:grid-cols-3 gap-6">
          <input type="text" placeholder="Election Name" value={name} onChange={e => setName(e.target.value)} required className="glass-input" />
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="glass-input" />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="glass-input" />
          <button type="submit" className="md:col-span-3 w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 shadow-lg hover:shadow-primary/50">
            Create Election
          </button>
        </form>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><CalendarIcon /> Election Schedule</h2>
        {loading ? <p className="text-center text-gray-400 py-8">Loading...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4">Election Name</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">End Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {elections.map(election => (
                  <tr key={election.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">{election.name}</td>
                    <td className="p-4">{election.startDate}</td>
                    <td className="p-4">{election.endDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(election.status)}`}>
                        {election.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveElectionsView;

