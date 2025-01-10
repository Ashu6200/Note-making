import { apiService } from "../apiService";

interface NoteResponse {
    message: string;
    request: {
        ip: string;
        method: string;
        url: string;
    };
    statusCode: number;
    success: boolean;
    data: object | Note[] | null;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
}

interface GetNoteResponse {
    data: NoteResponse;
    message: string;
    success: boolean;
    statusCode: number;
    meta: {
        request: {
            method: string;
            url: string;
        };
        response: {
            status: number;
            ok: boolean;
        };
    };
}

export const noteService = apiService.injectEndpoints({
    endpoints: builder => ({
        getAllNoteService: builder.query<GetNoteResponse, void>({
            query: () => ({
                url: "/note/all",
                method: "GET",
                credentials: "include",
            }),
            providesTags: result => {
                if (result && result.data) {
                    if (Array.isArray(result.data)) {
                        return [
                            ...result.data.map(({ _id }) => ({
                                type: "Note" as const,
                                id: _id,
                            })),
                            { type: "Note", id: "LIST" },
                        ];
                    }
                    return [{ type: "Note" }, { type: "Note", id: "LIST" }];
                }
                return [{ type: "Note", id: "LIST" }];
            },
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result.data;
                    if (!data) {
                        throw new Error("Invalid response data");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        createNoteService: builder.mutation<NoteResponse, Partial<Note>>({
            query: body => ({
                url: "/note/add",
                method: "POST",
                body: body,
                credentials: "include",
            }),
            invalidatesTags: [{ type: "Note", id: "LIST" }],

            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result.data;
                    if (!data) {
                        throw new Error("Invalid response data");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        deleteNoteService: builder.mutation<NoteResponse, Partial<Note>>({
            query: note => ({
                url: `/note/delete/${note._id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: [{ type: "Note", id: "LIST" }],

            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result.data;
                    if (!data) {
                        throw new Error("Invalid response data");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const {
    useGetAllNoteServiceQuery,
    useCreateNoteServiceMutation,
    useDeleteNoteServiceMutation,
} = noteService;

// export const noteService = apiService.injectEndpoints({
//     endpoints: builder => ({
//         getAllNoteService: builder.query<GetNoteResponse, void>({
//             query: () => ({
//                 url: "/note/all",
//                 method: "GET",
//                 credentials: "include",
//             }),
//             providesTags: ['Note'],
//             async onQueryStarted(_, { queryFulfilled }) {
//                 try {
//                     const result = await queryFulfilled;
//                     const { data } = result.data;
//                     if (!data) {
//                         throw new Error("Invalid response data");
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             },
//         }),
//         createNoteService: builder.mutation<NoteResponse, Partial<Note>>({
//             query: (body) => ({
//                 url: "/note/add",
//                 method: "POST",
//                 body: body,
//                 credentials: "include",
//             }),
//             invalidatesTags: ['Note'],
//             async onQueryStarted(_, { queryFulfilled }) {
//                 try {
//                     const result = await queryFulfilled;
//                     console.log(result)
//                     const { data } = result.data;
//                     if (!data) {
//                         throw new Error("Invalid response data");
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             },
//         }),
//         deleteNoteService: builder.mutation<NoteResponse, Partial<Note>>({
//             query: (id) => ({
//                 url: `/note/delete/${id}`,
//                 method: "DELETE",
//                 credentials: "include",
//             }),
//             invalidatesTags: [{ type: 'Note', id: 'LIST' }],
//             async onQueryStarted(_, { queryFulfilled, }) {
//                 try {
//                     const result = await queryFulfilled;
//                     const { data } = result.data;
//                     if (!data) {
//                         throw new Error("Invalid response data");
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             },
//         }),

//     })
// })
