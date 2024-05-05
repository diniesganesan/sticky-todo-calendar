import { Card, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { INotes } from '../util';
import { PopoverComponent } from './popover';

function SubNotes({ n }: { n: INotes }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <PopoverComponent {...{ isOpen, n, onClose, onOpen }}>
      <Card
        ml={1}
        mr={1}
        onClick={handleNote}
        w="100%"
        h="20px"
        _hover={{
          backgroundColor: 'white',
          opacity: 0.9,
        }}
      >
        <HStack w="100%" pl={1}>
          <span
            style={{
              backgroundColor: n.bulletColor,
              height: '7px',
              width: '8px',
              borderRadius: '50px',
            }}
          ></span>
          <Text pl={1} pr={1} w="100%" fontSize={14}>
            {n.description.length > 8
              ? n.description.substring(0, 8).padEnd(11, '.')
              : n.description}
          </Text>
        </HStack>
      </Card>
    </PopoverComponent>
  );
}

Notes.SubNotes = SubNotes;

export function Notes({ notes }: { notes: INotes[] }) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const splicedNotes = notes?.slice(0, 2);

  const handleMoreNotes = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    {
      e.stopPropagation();
      setShowMore(!showMore);
    }
  };

  return (
    <HStack flexWrap="wrap" overflow="auto" w="100%">
      {splicedNotes &&
        splicedNotes.length <= 2 &&
        !showMore &&
        splicedNotes.map((el: INotes, id: number) => (
          <SubNotes key={id} {...{ n: el }} />
        ))}
      {notes &&
        splicedNotes &&
        notes.length - splicedNotes.length >= 1 &&
        !showMore && (
          <Card flex={1} ml={1} mr={1} w="100%" h="20px">
            <Text
              color="black"
              textAlign="center"
              flex={1}
              pr={2}
              cursor="pointer"
              fontSize={14}
              onClick={handleMoreNotes}
            >{`+${notes.length - splicedNotes.length} more`}</Text>
          </Card>
        )}
      {notes && showMore && (
        <>
          {notes.map((n: INotes, nIdx: number) => (
            <SubNotes key={nIdx} {...{ n }} />
          ))}
          <Card flex={1} ml={1} mr={1} w="100%" h="20px">
            <Text
              color="black"
              textAlign="center"
              flex={1}
              pr={2}
              cursor="pointer"
              fontSize={14}
              onClick={handleMoreNotes}
            >
              Minimise
            </Text>
          </Card>
        </>
      )}
    </HStack>
  );
}
