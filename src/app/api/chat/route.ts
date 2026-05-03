export const runtime = "nodejs";

import { POST as _POST, OPTIONS } from "talkivo-chat/nextjs/chat";

export { OPTIONS };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = _POST as any;
