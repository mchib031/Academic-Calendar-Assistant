// schedule.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule.model';
import {ScheduleRepositoryInterface} from "./Interfaces/schedule.repository.interface";

@Injectable()
export class ScheduleRepository implements ScheduleRepositoryInterface {
  // check with whoever is working on backend for apiURL
  private apiUrl = 'http://localhost:3000/schedules';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getScheduleById(scheduleId: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${scheduleId}`);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${schedule.scheduleId}`, schedule);
  }

  deleteSchedule(scheduleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${scheduleId}`);
  }
}
