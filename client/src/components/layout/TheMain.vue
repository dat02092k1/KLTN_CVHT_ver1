<template>
    <div class="main">
        <div class="main-container pt-0 px-7 pb-7">
            <div class="nav-content bg-[#324f90] p-[1.5rem]">
                <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
                    <div>KHUNG CHƯƠNG TRÌNH ĐÀO TẠO</div>
                </div>
            </div>
        <div class="table-content bg-[#ffffff]">
            <div class="filter-container p-6">
                <div class="row grid grid-rows-2 font-bold">
                    <label class="text-[14px] text-[#606266] leading-10" for="">Chương trình đào tạo</label>
                    <label class="text-[14px] text-[#606266] leading-10" for="">Khoa học Máy tính chương trình chất lượng cao</label>
                </div>
            </div>
            <div class="content-container py-0 px-6 bg-[#fff]">
                <section class="">
                    <!-- <table id="table-course" class="text-[14px]">
                        <thead>
          <tr class="head-course">
            <th class="p-[1.5rem]">STT</th>
            <th class="">Mã HP</th>
            <th class="">Học phần</th>
            <th class="text-align--left">Số TC</th>
            <th class="text-align--left">LT</th>
            <th>TH</th>
            <th class="text-align--left">Tự học</th>
            <th class="text-align--left">Kỳ</th>
            <th class="text-align--left">Bắt buộc</th>
            <th>Tính điểm</th>
          </tr>
          <tr class="filter-course">
            <th></th>
            <th>
                <div>
                    <input class="filter-input h-8 text-[14px] leading-1 font-normal" type="text" placeholder="Mã HP">
                </div>
            </th>
            <th>
                <div>
                    <input class="filter-input h-8 text-[14px] leading-1 font-normal" type="text" placeholder="Học phần">
                </div>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                <div>
                    <input class="filter-input h-8 text-[14px] leading-1 font-normal" type="text" placeholder="Kỳ học">
                </div>
            </th>
            <th>
                <div>
                    <select name="cars">
    <option value="all">Tất cả</option>
    <option value="yes">Có</option>
    <option value="no">Không</option>
  </select>
                </div>
            </th>
            <th>
                <div>
                    <select name="cars">
    <option value="all">Tất cả</option>
    <option value="yes">Có</option>
    <option value="no">Không</option>
  </select>
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    <div>
                        <span>Khối kiến thức chung</span>
                    </div>
                </th>
            </tr>
            <tr class="course-list">
                <td class="p-[1.5rem] text-center">1</td>
                <td class="text-center">FLF1107</td>
                <td>Tiếng Anh B1</td>
                <td class="text-center">5</td>
                <td class="text-center">20</td>
                <td class="text-center">35</td>
                <td>0</td>
                <td class="text-center">1</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th>
                    <div>
                        <span>Khóa luận tốt nghiệp hoặc tương đương</span>
                    </div>
                </th>
            </tr>
            <tr class="course-list">
                <td class="p-[1.5rem] text-center">1</td>
                <td class="text-center">FLF1107</td>
                <td>Tiếng Anh B1</td>
                <td class="text-center">5</td>
                <td class="text-center">20</td>
                <td class="text-center">35</td>
                <td>0</td>
                <td class="text-center">1</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th>
                    <div>
                        <span>Khối kiến thức chung theo lĩnh vực</span>
                    </div>
                </th>
            </tr>
            <tr class="course-list">
                <td class="p-[1.5rem] text-center">1</td>
                <td class="text-center">FLF1107</td>
                <td>Tiếng Anh B1</td>
                <td class="text-center">5</td>
                <td class="text-center">20</td>
                <td class="text-center">35</td>
                <td>0</td>
                <td class="text-center">1</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
                    </table> -->
                <button @click="getData">Call api</button>
                </section>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: []
        }
    },
    methods: {
        async getData() {
            const response = await axios.get('http://localhost:8000/student/getAll/K64-C-CLC');
            this.data = response.data
            console.log(this.data.student[0].address);
        }
    }
}
</script>

<style scoped>
.main {
    padding: 14px 20px;
    width: calc(100% - 250px);
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    /* overflow-y: hidden; */
   }

.head-course th {
    padding: 0.75em 1.0em 0.75em 0.75em;
}

#table-course {
    border: 1px solid #dcdfe6;
    border-collapse: collapse;
}

.filter-course th {
    padding: 0.75em 1.5em 0.75em 0.75em;
}
table tr {
    border-bottom: 1px solid #dcdfe6;
}

.filter-input {
color: #606266;
border: 1px solid #dcdfe6;
padding: 6px 12px;
width: 100%;
}

.course-list td {
    padding: 0.75em 1.5em 0.75em 0.75em;
}
</style>