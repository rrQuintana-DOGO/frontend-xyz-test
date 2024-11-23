interface CommentsSectionProps {
  comments: Array<{
    author: string;
    timestamp: string;
    content: string;
  }>;
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <div className="flex flex-col justify-center mt-4 w-full">
      <div className="flex flex-wrap gap-4 items-start w-full">
        <div className="flex-1 shrink text-base font-bold leading-none whitespace-nowrap min-w-[240px] text-zinc-900">
          Comentarios
        </div>
        <button className="text-xs leading-none text-sky-600 hover:text-sky-700">
          Agregar comentario
        </button>
      </div>
      <div className="flex flex-wrap items-center mt-3 w-full text-sm leading-6 text-zinc-700">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold text-black">
              <th className="w-[198px] py-2 px-2 text-left">Registro</th>
              <th className="py-2 px-2 text-left">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index} className="border-t border-slate-300">
                <td className="py-2 px-2">
                  <span className="font-semibold">{comment.author}</span>
                  <br />
                  {comment.timestamp}
                </td>
                <td className="py-2 px-2">{comment.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}