import {
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Link,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { INotes } from '../util';

export const PopoverComponent = ({
  children,
  n,
  isOpen,
  onClose,
  onOpen,
}: {
  children: ReactNode;
  n: INotes;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  return (
    <Popover isOpen={isOpen} placement="bottom-start" onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent color="black" onClick={(e) => e.stopPropagation()}>
        <PopoverArrow />
        <PopoverCloseButton onClick={() => onClose()} />
        <PopoverHeader>Notes</PopoverHeader>
        <PopoverBody>
          {n.description.includes('https') ? (
            <Link href={n.description} isExternal>
              {n.description}
            </Link>
          ) : (
            n.description
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
