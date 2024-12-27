export async function getUserFromSession(req) {
    const session = await getSession({ req });
    return session?.user;
}