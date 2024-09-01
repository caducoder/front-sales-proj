import React from "react";
import { generateTimeSlots, Scheduler } from "mantine-scheduler";
import { Avatar, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

function CalendarPage() {
  // Define a list of users of whom have events
  const users = [
    { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Bob Williams", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eva Brown", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  // Define a list of events for the given users
  const events = [
    {
      id: 1,
      userId: 1,
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      title: "Meeting",
      color: "blue",
    },
    {
      id: 2,
      userId: 1,
      startTime: "2:00 PM",
      endTime: "2:30 PM",
      title: "Project Work",
      color: "green",
    },
  ];

  // Generate time slots for the scheduler
  // NOTE: generateTimeSlots is a helper method we provide
  const timeSlots = generateTimeSlots({
    start: "9:00 AM",
    end: "10:00 PM",
    interval: 60,
  });

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
  };

  return (
    <div>
      <Title order={2} mb={16}>
        Entregas agendadas
      </Title>
      <Scheduler
        date={dayjs}
        timeSlots={timeSlots}
        events={events}
        users={users}
        onEventClick={handleEventClick}
        userRenderer={(user) => (
          <Group>
            <Avatar src={user.avatar} radius="xl" />
            <Text size="sm" fw={500}>
              {user.name}
            </Text>
          </Group>
        )}
      />
    </div>
  );
}

export default CalendarPage;
