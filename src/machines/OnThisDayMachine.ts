import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {},
    events: {} as {
      type: string
    },
  },
  actors: {},
  actions: {},
  guards: {},
}).createMachine({
  context: {},
  id: "ON_THIS_DAY_MACHINE",
  initial: "IDLE",
  states: {
    IDLE: {
      type: "final",
    }
  },
});