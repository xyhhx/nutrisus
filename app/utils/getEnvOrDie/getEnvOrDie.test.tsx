import { describe, expect, it } from "vitest"

import getEnvOrDie from "./getEnvOrDie"

describe("getEnvOrDie", async () => {
	it("returns existing env vars", async () => {
		expect(getEnvOrDie("NODE_ENV")).toEqual(process.env.NODE_ENV)
	})

	it("throws when the request var does not exist", async () => {
		expect(() => getEnvOrDie("NONEXISTANT")).toThrow()
	})

	it("does not throw for falsy values", async () => {
		process.env.ZERO = "0"
		expect(getEnvOrDie("ZERO")).toEqual("0")
	})
})
