<template>
    <div>
        <b-col >
            <b-card tag="student" style="max-width: 20rem;" class="mb-2">   
                <div class="cardContainer">
                    <div class="cardHeader">
                        <b-img class="cardImage"  src="https://image.flaticon.com/icons/png/512/194/194931.png"></b-img>
                        <div class="cardTitle">
                            <h2>{{index}}</h2>
                            <h5>{{group}}</h5>
                            <div > 
                                <div class="cardBadges">
                                    <b-badge style="margin-bottom: 5px;"  v-if="lecturePoints != 0" variant="danger">Lecturer</b-badge>
                                    <b-badge  v-if="index == 30816 || index == 30769 " variant="success">FrontEnd Dev</b-badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cardBody">
                        <div class="bodyTag">
                            <div class="rowLabel">Total points:</div>
                            <div class="rowData">{{allPoints}}</div>
                        </div>
                        
                        <div class="bodyTag">
                            <div class="rowLabel">Mark:</div>
                            <div class="rowData">{{mark}}</div>
                        </div>

                        <div class="bodyTag">
                            <div class="rowLabel">Homework points:</div>
                            <div class="rowData">{{homeworkPoints}}</div>
                        </div>

                        <div class="bodyTag">
                            <div class="rowLabel">Presence:</div>
                            <div class="rowData">{{presenceCounter}}</div>
                        </div>

                        <div class="bodyTag">
                            <div class="rowLabel">Absence:</div>
                            <div class="rowData">{{absenceCounter}}</div>
                        </div>

                    </div>
                    <b-button v-bind:href="'details/'+index" variant="primary" class="detailsButton"  >Details</b-button>
                </div>
            </b-card>
        </b-col >
    </div>
</template>

<script>
export default {
    props:["allPoints","mark","homeworkPoints","presenceCounter","absenceCounter","index","group","lecturePoints"],
}
</script>

<style lang="scss" scoped>
    .cardContainer, .cardBadges, .cardTitle{
        display: flex;
        flex-direction: column;
    }
    .cardHeader{
        display: flex;
        flex-direction: row;
        align-items: top;
        justify-content: center;
    }
    .cardImage{
        margin:6px;
        width:170px;
        height:170px;
    }
    .cardBadges{
        align-items: flex-end;
    }
    .cardTitle{
        align-items: top;
    }
    h2,h5{
        font-weight: bold;
    }
    h5{
        display: flex;
        align-self: flex-end;
    }
    .bodyTag{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .rowLabel{
        display: flex;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
    }
    .rowData{
        display: flex;
    }
    .mb-2{
        background-image: url(https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148434266.jpg?size=626&ext=jpg);
        margin-top: 20px;
    }
    .detailsButton{
        margin-top: 15px;
    }
</style>