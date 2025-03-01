import { useState, useEffect, useRef } from "react";

const UploadForm = ({ setSchedules }) => {
  const [file, setFile] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [repeat, setRepeat] = useState("none");
  const [day, setDay] = useState("");

  const fileInputRef = useRef(null); // Tambahkan useRef

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile({ name: uploadedFile.name, data: e.target.result });
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  useEffect(() => {
    if (date) {
      const selectedDate = new Date(date);
      const dayNames = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      setDay(dayNames[selectedDate.getDay()]);
    }
  }, [date]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && time && date) {
      const newSchedule = {
        file: file.name,
        time,
        day,
        date,
        repeat,
        audio: file.data,
      };

      setSchedules((prev) => {
        const updatedSchedules = [...prev, newSchedule];
        localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
        return updatedSchedules;
      });

      // Reset state
      setFile(null);
      setTime("");
      setDate("");
      setRepeat("none");
      setDay("");

      // Reset input file secara manual
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("❌ Harap isi semua data!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl border space-y-6 transition-all duration-300 hover:shadow-2xl text-white font-poppins"
    >
      <h1 className="text-3xl mb-6 font-bold text-center uppercase tracking-wider">
        🎶 Tambah Jadwal Lagu 📜
      </h1>

      {/* Input File */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="file" className="text-lg font-medium">
          Pilih Lagu
        </label>
        <input
          id="file"
          type="file"
          accept="audio/*"
          ref={fileInputRef} // Tambahkan ref
          onChange={handleUpload}
          className="p-3 border-2 border-white/30 rounded-lg bg-white/10 focus:ring-4 focus:ring-purple-400 transition"
        />
        {file && <p className="text-sm mt-1">🎵 {file.name}</p>}
      </div>

      {/* Input Waktu */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="time" className="text-lg font-medium">
          Pilih Waktu
        </label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-3 border-2 border-white/30 rounded-lg bg-white/10 focus:ring-4 focus:ring-purple-400 transition"
        />
      </div>

      {/* Input Tanggal */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="date" className="text-lg font-medium">
          Pilih Tanggal
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border-2 border-white/30 rounded-lg bg-white/10 focus:ring-4 focus:ring-purple-400 transition"
        />
        {date && <p className="text-sm mt-1">📅 Hari: {day}</p>}
      </div>

      {/* Dropdown Repeat */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="repeat" className="text-lg font-medium">
          Pengulangan
        </label>
        <select
          id="repeat"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="p-3 border-2 border-white/30 rounded-lg bg-white/10 focus:ring-4 focus:ring-purple-400 transition"
        >
          <option value="none">Tidak Berulang</option>
          <option value="1-pekan">Setiap 1 Pekan</option>
          <option value="2-pekan">Setiap 2 Pekan</option>
          <option value="3-pekan">Setiap 3 Pekan</option>
        </select>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white px-5 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-300 shadow-md"
      >
        🚀 Tambah Jadwal
      </button>
    </form>
  );
};

export default UploadForm;
