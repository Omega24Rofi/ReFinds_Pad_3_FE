import React from 'react'

const testing = () => {
  return (
    <div>
        <label className="block text-sm font-medium">Alamat Lama</label>
        <div className="mb-4">
            {user.alamat && user.alamat.length > 0 ? (
            user.alamat.map((alamat) => (
                <div
                key={alamat.id_alamat}
                className="p-2 mb-2 border rounded bg-gray-100"
                >
                {alamat.nama_lokasi}, Kec. {alamat.kecamatan}, Kota/Kab.{" "}
                {alamat.kota_kabupaten}, Prov. {alamat.provinsi}, Kode Pos.{" "}
                {alamat.kode_pos}
                </div>
            ))
            ) : (
            <div>No existing addresses available</div>
            )}
        </div>

    <label className="block text-sm font-medium">Tambah Alamat Baru</label>
        <div className="space-y-2">
            <input
            type="text"
            name="nama_lokasi"
            placeholder="Nama Lokasi"
            value={newAddress.nama_lokasi}
            onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, nama_lokasi: e.target.value }))
            }
            className="block w-full border-gray-300 rounded-md shadow-sm"
            />
            <input
            type="text"
            name="kecamatan"
            placeholder="Kecamatan"
            value={newAddress.kecamatan}
            onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, kecamatan: e.target.value }))
            }
            className="block w-full border-gray-300 rounded-md shadow-sm"
            />
            <input
            type="text"
            name="kota_kabupaten"
            placeholder="Kota/Kabupaten"
            value={newAddress.kota_kabupaten}
            onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, kota_kabupaten: e.target.value }))
            }
            className="block w-full border-gray-300 rounded-md shadow-sm"
            />
            <input
            type="text"
            name="provinsi"
            placeholder="Provinsi"
            value={newAddress.provinsi}
            onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, provinsi: e.target.value }))
            }
            className="block w-full border-gray-300 rounded-md shadow-sm"
            />
            <input
            type="text"
            name="kode_pos"
            placeholder="Kode Pos"
            value={newAddress.kode_pos}
            onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, kode_pos: e.target.value }))
            }
            className="block w-full border-gray-300 rounded-md shadow-sm"
            />
            <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
            >
            Tambah Alamat
            </button>
    </div>
</div>

  )
}

export default testing