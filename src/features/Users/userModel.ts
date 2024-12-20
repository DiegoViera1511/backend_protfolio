import {IUserModel} from "../Interfaces/IUserModel";
import {NewUser, User, users} from "../../db/schema/userSchema";
import {db} from "../../db/config/config";
import {eq} from "drizzle-orm";

export class UserModel implements IUserModel {
    async create(newUser: NewUser): Promise<void> {
        await db.insert(users).values(newUser).returning();
    }

    async getUserByName(name: string): Promise<User | null> {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.name, name))
            .limit(1);
        if (!user.length) {
            return null
        }
        return user[0];
    }
    async getUserByToken(token : string) : Promise<User | null>{
        const user = await db
            .select()
            .from(users)
            .where(eq(users.token, token))
            .limit(1);
        if (!user.length) {
            return null
        }
        return user[0];
    }

    async updateUserToken(name: string, token: string): Promise<void> {
        await db.update(users).set({token: token}).where(eq(users.name, name));
    }
}


