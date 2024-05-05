import React, { useEffect, useState } from 'react';
import { Button, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import {
  ICalanderDates,
  colors,
  days,
  fillInDates,
  generateCalendarDates,
  months,
  saveCalendarDates,
  retrieveCalendarDates,
  clearStorage,
} from '../util';
import { Notes } from '../component/notes';
import { NoteModal } from '../component/modal';

export const StickyTodoCalendar = () => {
  function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState<ICalanderDates>({
    date: 0,
    day: '',
  });
  const [month, setMonth] = useState<number>(0);
  const [calendarDates, setCalendarDates] = useState(
    retrieveCalendarDates(months[month as keyof typeof months]) ??
      fillInDates(generateCalendarDates(2024, month))
  );

  useEffect(() => {
    clearStorage();
  }, []);

  useEffect(() => {
    setCalendarDates(
      retrieveCalendarDates(months[month as keyof typeof months]) ??
        fillInDates(generateCalendarDates(2024, month))
    );
  }, [month]);

  useEffect(() => {
    saveCalendarDates(
      months[month as keyof typeof months],
      calendarDates as ICalanderDates[]
    );
  }, [calendarDates]);

  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? (prev = 11) : prev - 1));
  };
  const nextMonth = () => {
    setMonth((prev) => (prev === 11 ? (prev = 0) : prev + 1));
  };

  const createNotes = (
    el: { date: number; day: string },
    description: string
  ) => {
    if (el.date !== 0) {
      setCalendarDates((prev) =>
        prev?.map((prv: any) => {
          return {
            ...prv,
            notes:
              prv.date === el.date && prv.day === el.day
                ? prv.notes
                  ? [
                      ...prv.notes,
                      {
                        description: description,
                        bulletColor: randomColor(),
                      },
                    ]
                  : [
                      {
                        description: description,
                        bulletColor: randomColor(),
                      },
                    ]
                : prv.notes,
          };
        })
      );
    }
  };
  return (
    <VStack spacing={0}>
      <HStack w="840px" pt={2} pb={2}>
        <Button onClick={prevMonth}>
          <Text>Prev</Text>
        </Button>
        <Text flex={1} textAlign="center" fontWeight="bold">
          {months[month as keyof typeof months]}
        </Text>
        <Button onClick={nextMonth}>
          <Text>Next</Text>
        </Button>
      </HStack>
      <HStack spacing={0}>
        {Object.entries(days).map(([_key, value]) => {
          return (
            <VStack
              w="120px"
              bg={colors.daysBg}
              color={colors.fontColor}
              key={value}
              pt={2}
            >
              <Text fontWeight="bold">{value}</Text>
              <VStack spacing={0}>
                {calendarDates
                  ?.filter((el: any) => el.day === value)
                  .map((el: any, i: number) => {
                    return (
                      <VStack
                        onClick={() => {
                          onOpen();
                          setSelectedDay(el);
                        }}
                        _hover={{
                          backgroundColor:
                            el.date === 0
                              ? undefined
                              : `rgba(255, 255, 255, .8)`,
                        }}
                        border={`1px solid white`}
                        spacing={0}
                        key={i}
                        h="120px"
                        bg={colors.datesBg}
                        w="120px"
                        style={
                          el.date === 0
                            ? { cursor: 'not-allowed' }
                            : { cursor: 'pointer' }
                        }
                      >
                        <Text
                          fontWeight="bold"
                          position="relative"
                          left={-10}
                          style={
                            el.date === 0
                              ? { color: 'transparent' }
                              : { color: '#000000' }
                          }
                        >
                          {el.date}
                        </Text>
                        <Notes key={i} {...{ notes: el.notes }} />
                      </VStack>
                    );
                  })}
              </VStack>
            </VStack>
          );
        })}
      </HStack>
      <NoteModal
        {...{
          isOpen,
          onClose,
          onHandleNote: createNotes,
          calendar: selectedDay,
        }}
      />
    </VStack>
  );
};
