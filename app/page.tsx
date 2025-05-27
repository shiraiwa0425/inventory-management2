export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">仕入れ管理システム</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">仕入れデータ</h2>
          <p className="text-gray-600">仕入れデータの一覧を表示・管理します。</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">仕入れ先管理</h2>
          <p className="text-gray-600">仕入れ先情報の管理を行います。</p>
        </div>
      </div>
    </main>
  )
} 