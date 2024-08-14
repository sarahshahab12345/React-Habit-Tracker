import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import HabitTable from "./HabitTable";

const AddHabit = () => {
  const initialHabits = JSON.parse(localStorage.getItem("habits")) || [];
  const [habits, setHabits] = useState(initialHabits);
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit.trim()) {
      alert("Habit name cannot be empty");
      return;
    }
    const updatedHabits = [...habits];
    if (editIndex !== null) {
      updatedHabits[editIndex] = {
        name: habit,
        description,
        status: updatedHabits[editIndex].status,
      };
      setEditIndex(null);
    } else {
      updatedHabits.push({
        name: habit,
        description,
        status: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
      });
    }
    setHabits(updatedHabits);
    setHabit("");
    setDescription("");
    setOpen(false);
  };

  const removeHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const editHabit = (index) => {
    setHabit(habits[index].name);
    setDescription(habits[index].description || "");
    setEditIndex(index);
    setOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "completed" &&
        Object.values(habit.status).every((status) => status)) ||
      (filterStatus === "pending" &&
        Object.values(habit.status).some((status) => !status));

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" sx={{ color: "#2C3E50", fontWeight: "bold" }}>
          Manage Habits
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2C3E50",
            "&:hover": { backgroundColor: "#34495E" },
          }}
          onClick={() => setOpen(true)}
        >
          Add New Habit
        </Button>
      </Box>

      <TextField
        label="Search Habits"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ maxWidth: "300px", borderColor: "#2C3E50" }}
        InputLabelProps={{
          style: { color: "#2C3E50" },
        }}
        InputProps={{
          style: { color: "#2C3E50", borderColor: "#2C3E50" },
        }}
      />

      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel sx={{ color: "#2C3E50" }}>Filter by Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          label="Filter by Status"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#2C3E50" },
              "&:hover fieldset": { borderColor: "#34495E" },
              "&.Mui-focused fieldset": { borderColor: "#2C3E50" },
            },
            "& .MuiSelect-icon": { color: "#2C3E50" },
            color: "#2C3E50",
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>

      <HabitTable
        habits={filteredHabits}
        onEdit={editHabit}
        onDelete={removeHabit}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editIndex !== null ? "Edit Habit" : "Add New Habit"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Habit Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            sx={{
              "& label": { color: "#2C3E50" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#2C3E50" },
                "&:hover fieldset": { borderColor: "#2C3E50" },
                "&.Mui-focused fieldset": { borderColor: "#2C3E50" },
              },
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& label": { color: "#2C3E50" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#2C3E50" },
                "&:hover fieldset": { borderColor: "#2C3E50" },
                "&.Mui-focused fieldset": { borderColor: "#2C3E50" },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            sx={{
              color: "#2C3E50",
              "&:hover": { color: "#34495E" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#2C3E50",
              "&:hover": { backgroundColor: "#34495E" },
            }}
            onClick={handleSubmit}
          >
            {editIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddHabit;
