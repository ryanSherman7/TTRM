import { Request } from "express"
import type UserInterface from '../interfaces/user.interface';

export default interface apiRequest extends Request {
    user?: UserInterface
}