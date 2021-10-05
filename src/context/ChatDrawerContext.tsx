import React from "react";

interface IChatDrawerState {
    isFixed: boolean;
    isOpen: boolean;
}

export enum ChatDrawerActionsEnum {
    TOGGLE_FIXED = 'toggleFixed',
    TOGGLE_OPEN = 'toggleOpen'
}


type ChatDrawerAction =
    {
        type: ChatDrawerActionsEnum.TOGGLE_FIXED,
        payload: boolean
    } |
    {
        type: ChatDrawerActionsEnum.TOGGLE_OPEN,
        payload: boolean
    }

type Dispatch = (action: ChatDrawerAction) => void
type ChatDrawerProviderProps = {children: React.ReactNode}


const ChatDrawerContext = React.createContext<{state: IChatDrawerState, dispatch: Dispatch} | undefined>(undefined)

const ChatDrawerInitState: IChatDrawerState = {
    isFixed: true,
    isOpen: true
}

function chatDrawerReducer(state: IChatDrawerState, action: ChatDrawerAction) {
    switch (action.type) {
        case ChatDrawerActionsEnum.TOGGLE_FIXED: {
            return {...state, isFixed: action.payload}
        }
        case ChatDrawerActionsEnum.TOGGLE_OPEN: {
            return {...state, isOpen: action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}

const ChatDrawerProvider = ({children}: ChatDrawerProviderProps) => {
    const [state, dispatch] = React.useReducer(chatDrawerReducer, ChatDrawerInitState)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context

    const value = {state, dispatch}
    return (
        <ChatDrawerContext.Provider value={value}>
            {children}
        </ChatDrawerContext.Provider>
    )
}

function useChatDrawer() {
    const context = React.useContext(ChatDrawerContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export {ChatDrawerProvider, useChatDrawer}
