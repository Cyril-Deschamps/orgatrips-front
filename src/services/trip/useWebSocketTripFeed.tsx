import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../api/config";
import {
  LiveFeedWebSocketRequest,
  LiveFeedWebSocketRequestType,
  LiveFeedWebSocketResponse,
  LiveFeedWebSocketResponseType,
  Trip,
} from "./trip";
import { GET_FEED_TRIPS_KEY } from "./tripHooks";
import { useAuthContext } from "../auth/apiProvider";

export type WebSocketTripFeed = {
  ws: WebSocket | null;
  addLike: ({ tripId }: { tripId: NonNullable<Trip["id"]> }) => void;
  removeLike: ({ tripId }: { tripId: NonNullable<Trip["id"]> }) => void;
  isWsConnected: boolean;
};

function useWebSocketTripFeed(): WebSocketTripFeed {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const queryClient = useQueryClient();
  const { loggedUser } = useAuthContext();

  useEffect(() => {
    if (loggedUser) {
      const wsInstance = new WebSocket(
        `${baseURL}/trips/liveFeed/${loggedUser.xsrfToken}`,
      );

      wsInstance.onopen = () => {
        setIsWsConnected(true);
      };

      // If its too fast
      if (wsInstance.readyState === WebSocket.OPEN) {
        setIsWsConnected(true);
      }

      setWs(wsInstance);
      return () => {
        wsInstance.close();
      };
    }
  }, [loggedUser]);

  useEffect(() => {
    if (ws === null) return;

    ws.onmessage = ({ data }) => {
      const response = JSON.parse(data) as LiveFeedWebSocketResponse;

      switch (response.type) {
        case LiveFeedWebSocketResponseType.REFRESH_DATA:
          queryClient.invalidateQueries({ queryKey: GET_FEED_TRIPS_KEY() });
          break;
        case LiveFeedWebSocketResponseType.ERROR:
          /* Handle error */
          break;
      }
    };
  }, [queryClient, ws]);

  const addLike: WebSocketTripFeed["addLike"] = useCallback(
    ({ tripId }) => {
      if (ws === null) return;

      ws.send(
        JSON.stringify({
          type: LiveFeedWebSocketRequestType.LIKE,
          params: { tripId: tripId },
        } as LiveFeedWebSocketRequest),
      );
    },
    [ws],
  );

  const removeLike: WebSocketTripFeed["removeLike"] = useCallback(
    ({ tripId }) => {
      if (ws === null) return;

      ws.send(
        JSON.stringify({
          type: LiveFeedWebSocketRequestType.UNLIKE,
          params: { tripId: tripId },
        } as LiveFeedWebSocketRequest),
      );
    },
    [ws],
  );

  return { ws, addLike, removeLike, isWsConnected };
}

export default useWebSocketTripFeed;
