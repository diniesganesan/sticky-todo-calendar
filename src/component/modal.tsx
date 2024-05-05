import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const NoteModal = ({
  onHandleNote,
  isOpen,
  calendar,
  onClose,
}: {
  calendar: { date: number; day: string };
  isOpen: boolean;
  onClose: () => void;
  onHandleNote: (
    cal: { date: number; day: string },
    description: string
  ) => void;
}) => {
  const [description, setDescription] = useState<string>('');
  const handleAddNote = () => {
    if (!description) return;
    onHandleNote({ ...calendar }, description);
    setDescription('');
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Text>Description</Text>
            <Input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddNote}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
