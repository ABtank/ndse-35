import { Container, decorate, injectable }  from "inversify";
import { AuthController }  from "../controllers/authController";
import { BookController }  from "../controllers/bookController";
import { ChatMessageController }  from "../controllers/chatMessageController";
import { SocketHandler } from "../controllers/socketHandler";
export const container = new Container();

export const TYPES = {
    AuthController: Symbol.for('AuthController'),
};

decorate(injectable(), AuthController);
decorate(injectable(), BookController);
decorate(injectable(), ChatMessageController);
decorate(injectable(), SocketHandler);

container.bind(TYPES.AuthController).to(AuthController).inSingletonScope();
container.bind(BookController).toSelf().inSingletonScope();
container.bind(SocketHandler).toSelf().inSingletonScope();
container.bind(ChatMessageController).toSelf().inSingletonScope();