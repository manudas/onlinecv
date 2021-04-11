import { FAIL, SUCCESS, WARNING } from "@store_actions/Common";
export type MessageType = ReturnType<typeof SUCCESS> | ReturnType<typeof FAIL> | ReturnType<typeof WARNING>