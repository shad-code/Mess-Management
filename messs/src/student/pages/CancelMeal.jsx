import { useState } from 'react';
import { useCancelMealMutation } from '../../apis/mealApi'; // Adjust path if needed

function CancelMeal() {
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => setFormOpen(true)}
      >
        Cancel Meal
      </button>

      {isFormOpen && <CancelMealForm closeForm={() => setFormOpen(false)} />}
    </div>
  );
}

function CancelMealForm({ closeForm }) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 3);

  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [cancelMeal] = useCancelMealMutation(); // RTK Query

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = new Date(selectedDate);
    if (selected > maxDate) {
      setError('You cannot select a date more than 3 days ahead.');
      return;
    }

    try {
      await cancelMeal({ date: selectedDate }).unwrap(); // Only sending date
      alert('Meal cancellation submitted');
      closeForm();
    } catch (err) {
      console.error('Error canceling meal:', err);
      setError('Failed to cancel meal. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Cancel Meal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            min={today.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
            <button type="button" onClick={closeForm} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelMeal;



