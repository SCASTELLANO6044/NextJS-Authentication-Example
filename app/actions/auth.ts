import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'
import supabase from '@/db/supabase'

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)
    // Call the provider or db to create a user...

    const { data, error } = await supabase
        .from("users")
        .insert({
            name: name,
            email: email,
            password: hashedPassword,
        })
        .select();
    if (error) {
        throw new Error(`Supabase error: ${error.message}`);
    }

    const user = data?.[0];
    console.log(`User ${name} created:`, user);

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }
}