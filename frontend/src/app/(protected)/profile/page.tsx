"use client"
import useUser from '@/utils/query'
import React from 'react'
import { User, Mail } from 'lucide-react';


export default function HomePage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80")'
            }}
          />
          <div className="relative px-6 pb-8">
            <div className="flex flex-col items-center -mt-20">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User size={64} className="text-indigo-600" />
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-gray-900">{user?.fullname}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <Mail size={16} className="mr-2" />
                <span>{user?.email}</span>
              </div>
              <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'UI/UX Design', 'Node.js', 'GraphQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity</h2>
                <div className="h-24 flex items-end space-x-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-indigo-100 rounded-t-md hover:bg-indigo-200 transition-colors"
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
