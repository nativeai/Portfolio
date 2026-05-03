export const runtime = "nodejs";

import {
  GET as _GET,
  POST as _POST,
  DELETE as _DELETE,
} from "talkivo-chat/nextjs/training";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET = _GET as any;
export const POST = _POST as any;
export const DELETE = _DELETE as any;
/* eslint-enable @typescript-eslint/no-explicit-any */
