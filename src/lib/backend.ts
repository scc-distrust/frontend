import { io, Socket } from "socket.io-client";
import { get, writable } from "svelte/store";
import { isHost, self, selfId } from "./user";

export const Colors = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple', 'pink', 'white', 'black'] as const;
export type Color = typeof Colors[number];

export const Roles = ['Traitor', 'Worker'] as const;
export type Role = typeof Roles[number];

export const State = ['Waiting', 'Playing', 'Eliminated'] as const;
export type State = typeof State[number];

export const Tasks = ['Switches', 'Wires', 'Calibrate Distribution'] as const;
export type Task = typeof Tasks[number];

export interface Player {
	name: string;
	device_id: string;
	profile_picture: string;
	color: Color;
	role: Role;
	state: State;
	tasks: Map<Task, number>;
}

export const players = writable<Player[]>([]);
export const socket = writable<Socket | null>(null);

export const connection = () => {
    const current = get(socket);
    if (current === null) throw new Error("Not connected to the server.");

    return current;
}

export const connect = (url: string): Promise<string | null> => {
    return new Promise((resolve, _) => {
        const current = get(socket);
        if (current !== null) {
            current.disconnect();
        }

        socket.set(io(url));
        const store = get(socket)!;

        store.on("connect", () => {
            console.log("[backend] connected");
            resolve(null)
        });

        store.on("connect_error", (err) => {
            console.error("[backend] connect error", err);

            let message = err.message;
            if (message === "xhr poll error") {
                message = "Failed to reach the server, please check your internet connection and the server address.";
            }

            resolve(message);
        });

        store.on("disconnect", () => {
            console.log("[backend] disconnected");
            window.location.reload();
        });

        store.on('join', (player: Player) => {
            players.update(players => {
                if (players.some(p => p.device_id === player.device_id)) {
                    return players;
                }

                players.push(player);
                return players;
            });
        });

        store.on('leave', (player: Player) => {
            players.update(players => {
                const index = players.findIndex(p => p.device_id === player.device_id);
                if (index === -1) return players;

                players.splice(index, 1);
                return players;
            });
        });

        store.on('players', (currentPlayers: Player[]) => {
            players.set(currentPlayers.map((player) => ({
                ...player,
                tasks: new Map(player.tasks as any), // It's not actually a map yet
            })));

            const us = currentPlayers.find(p => p.device_id === get(selfId));
            if (us !== undefined) {
                self.set(us);
                if (currentPlayers.length > 0 && currentPlayers.indexOf(us) !== 0) {
                    isHost.set(false);
                }
            }
        });

        store.on("error", (err) => {
            console.error("[backend] error", err);
        });

        store.onAny((event, ...data) => {
            console.log(`[backend] [debug] ${event}: ${data.map(d => JSON.stringify(d)).join(", ")}`);
        })
    });
};

export const disconnect = () => {
    const connection = get(socket);
    if (connection === null) return;

    connection.disconnect();
}

export const login = (
    name: string,
    device_id: string,
    profile_picture: string
) => {
    connection().emit("login", {
        name,
        device_id,
        profile_picture,
    });
}

export const start = () => {
    connection().emit("start_game");
}