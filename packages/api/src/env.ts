import z from 'zod'

const schema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(8000),
  HOST: z.string().default('localhost'),
  DATABASE_URL: z.string(),
})

const result = schema.safeParse(process.env)

if (!result.success) {
  console.error(
    'invalid environment variables: ',
    z.prettifyError(result.error),
  )
  throw result.error
}

export const env = result.data
