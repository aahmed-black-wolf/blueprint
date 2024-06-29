"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { Comment } from '../../@types/Comments';

// Define the type for the context state and updater function
interface CommentContextType {
  newComments: Comment[];
  setNewComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

// Create the context with a default value of undefined
const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};

type CommentProviderProps = {
  children: ReactNode;
};

// Define the CommentProvider component
const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [newComments, setNewComments] = useState<Comment[]>([]);

  return (
    <CommentContext.Provider value={{ newComments, setNewComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
