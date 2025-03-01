const ScheduleList = ({ schedules, setSchedules }) => {
  const handleDelete = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  const repeatText = {
    none: "Tidak Berulang",
    "1-pekan": "Setiap 1 Pekan",
    "2-pekan": "Setiap 2 Pekan",
    "3-pekan": "Setiap 3 Pekan",
  };

  return (
    <div className="mt-10 p-8 max-w-xl mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl border space-y-6 text-white">
      <h3 className="text-3xl font-bold text-center text-white drop-shadow-md flex items-center justify-center gap-2">
        📅 <span className="text-white">Jadwal Lagu</span>
      </h3>

      {schedules.length === 0 ? (
        <p className="text-center text-white text-lg italic">
          Belum ada jadwal.
        </p>
      ) : (
        schedules.map((schedule, index) => (
          <div
            key={index}
            className="p-5 bg-white rounded-xl shadow-md border flex justify-between items-center transition-all duration-300"
          >
            <div>
              <p className="font-semibold text-lg text-purple-800">
                🎵 {schedule.file}
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-gray-700">⏰ {schedule.time}</span>
                <span className="text-gray-700">
                  📅 {schedule.date} ({schedule.day})
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                🔁 {repeatText[schedule.repeat]}
              </p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:text-red-700"
            >
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ScheduleList;
